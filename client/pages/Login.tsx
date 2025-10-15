import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { KeyStatus } from "@/features/matter/layout/KeyStatus";

const formatAccountHint = (account: string) => {
  if (!account) return "";
  const trimmed = account.trim();
  if (!trimmed.includes("@")) {
    return `${trimmed}@matter.app`;
  }
  return trimmed;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const accountHint = useMemo(() => formatAccountHint(account), [account]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const performAuth = async (mode: "signup" | "login") => {
    if (!account.trim() || !password.trim()) {
      toast.error("請輸入完整的帳號與密碼");
      return;
    }

    try {
      setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 420));
      login({ account: account.trim(), password: password.trim() });
      toast.success(
        mode === "signup"
          ? "歡迎加入 Matter，開始紀錄重要的每一天"
          : "登入成功，祝你有充實的一天",
      );
      navigate("/", { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    performAuth("login");
  };

  return (
    <div className="min-h-screen w-full bg-transparent px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-sm">
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-[32px] border border-border/70 bg-card/95 p-8 shadow-soft backdrop-blur-xl">
          <div className="absolute -right-24 -top-20 h-48 w-48 rounded-full bg-brand-soft/60 blur-3xl" aria-hidden />
          <div className="absolute -left-16 -bottom-20 h-52 w-52 rounded-full bg-brand-sun/20 blur-3xl" aria-hidden />

          <div className="relative flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold uppercase text-muted-foreground/70">
                <span style={{ letterSpacing: "2px" }}>Matter</span>
              </h4>
              <h1 className="mt-3 text-4xl font-bold text-brand-deep">
                {"Welcome\u00a0"}
              </h1>
            </div>
            <KeyStatus active={false} />
          </div>

          <p className="relative flex flex-col text-lg font-semibold leading-7 text-brand-deep/90">
            <span className="mx-auto flex flex-col items-center tracking-[0.35em] uppercase text-brand-deep">
              <div className="mr-auto">Hey guest,</div>
              <br />
              <div className="mr-[130px]">please sign up first!</div>
            </span>
          </p>

          <form className="relative flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="account"
                className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80"
              >
                Account
              </label>
              <Input
                id="account"
                type="email"
                inputMode="email"
                value={account}
                onChange={(event) => setAccount(event.target.value)}
                placeholder="guest@matter.app"
                className="h-12 rounded-2xl border border-border/80 bg-white/90 px-4 text-base font-semibold text-brand-deep placeholder:text-muted-foreground/60"
                required
              />
              {accountHint && (
                <p className="text-xs font-medium text-muted-foreground/70">
                  建議使用電子郵件，例如 {accountHint}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-[2px] text-muted-foreground/80"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="至少 8 碼"
                className="h-12 rounded-2xl border border-border/80 bg-white/90 px-4 text-base font-semibold text-brand-deep placeholder:text-muted-foreground/60"
                required
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 rounded-2xl bg-brand text-base font-semibold tracking-[0.2em] text-white shadow-brand transition hover:brightness-105"
              >
                {submitting ? "Signing in..." : "Log in"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={submitting}
                className="h-12 rounded-2xl border-2 border-brand text-base font-semibold tracking-[0.2em] text-brand transition hover:bg-brand hover:text-white"
                onClick={() => performAuth("signup")}
              >
                Sign up
              </Button>
            </div>
          </form>

          <footer className="relative space-y-1 text-center text-xs text-muted-foreground/80">
            <p className="text-center">Matter — Record what really matters.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
