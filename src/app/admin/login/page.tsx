"use client";

import { useState, type FC, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const AdminLoginPage: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 border border-sea/10 bg-white p-8 shadow-sm"
      >
        <h1 className="font-display text-2xl text-sea">Admin login</h1>
        <p className="text-sm text-muted">Holiday Villa Thassos inquiries</p>

        <label className="block text-sm">
          <span className="font-medium">Email</span>
          <input
            type="email"
            required
            className="mt-1 w-full border border-sea/15 px-3 py-2.5 outline-none focus:border-sea"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium">Password</span>
          <input
            type="password"
            required
            className="mt-1 w-full border border-sea/15 px-3 py-2.5 outline-none focus:border-sea"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sea py-3 text-sm font-semibold text-white hover:bg-sea-deep disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
