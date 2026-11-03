"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/profile";

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  authError: string | null;
  refreshProfile: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    displayName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const refreshProfile = useCallback(async () => {
    if (!session?.user) {
      setProfile(null);
      return;
    }

    const { data, error } = await getSupabaseClient()
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    if (error) throw new Error(`Không thể tải hồ sơ: ${error.message}`);
    setProfile(data);
  }, [session]);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;
    void Promise.resolve()
      .then(() => getSupabaseClient())
      .then(async (supabase) => {
        if (!active) return;
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, nextSession) => {
          if (!active) return;
          setSession(nextSession);
          if (!nextSession) setProfile(null);
          setAuthError(null);
          setLoading(false);
        });
        unsubscribe = () => subscription.unsubscribe();
        const { data, error } = await supabase.auth.getSession();
        if (!active) return;
        if (error) setAuthError(`Không thể khôi phục phiên: ${error.message}`);
        setSession(data.session);
        setLoading(false);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setAuthError(messageOf(error));
        setLoading(false);
      });
    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    let active = true;
    void Promise.resolve(
      getSupabaseClient()
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single(),
    )
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setAuthError(`Không thể tải hồ sơ: ${error.message}`);
        else setProfile(data);
      })
      .catch((error: unknown) => {
        if (active) setAuthError(messageOf(error));
      });
    return () => {
      active = false;
    };
  }, [session]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await getSupabaseClient().auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (error.message.toLowerCase().includes("invalid login credentials")) {
        throw new Error("Email hoặc mật khẩu không chính xác.");
      }
      throw new Error(`Đăng nhập không thành công: ${error.message}`);
    }
  }, []);

  const signUp = useCallback(
    async (displayName: string, email: string, password: string) => {
      const { data, error } = await getSupabaseClient().auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      });
      if (error) {
        if (error.message.toLowerCase().includes("already registered")) {
          throw new Error("Email này đã được đăng ký.");
        }
        throw new Error(`Đăng ký không thành công: ${error.message}`);
      }
      return Boolean(data.session);
    },
    [],
  );

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (session?.user) {
      const { error: presenceError } = await supabase
        .from("profiles")
        .update({ is_online: false, last_seen_at: new Date().toISOString() })
        .eq("id", session.user.id);
      if (presenceError) {
        throw new Error(`Không thể cập nhật trạng thái: ${presenceError.message}`);
      }
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }, [session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      profile,
      loading,
      authError,
      refreshProfile,
      signIn,
      signUp,
      signOut,
    }),
    [
      session,
      profile,
      loading,
      authError,
      refreshProfile,
      signIn,
      signUp,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được dùng bên trong AuthProvider.");
  return context;
}
