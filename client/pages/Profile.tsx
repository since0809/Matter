import { useMemo } from "react";
import { CalendarHeart, Gift, LogOut, Sparkles, Trophy, UserPlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  forecastNextHighlightDate,
  profileStats,
} from "@/features/matter/data/mockData";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const usageDuration = useMemo(() => {
    return formatDistanceToNow(profileStats.startedAt, { addSuffix: false });
  }, []);

  const nextHighlightDate = useMemo(() => forecastNextHighlightDate(), []);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-border/70 bg-white/95 p-6 shadow-soft">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-28 w-28 rounded-full bg-brand-soft/50 blur-2xl" aria-hidden />
            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-brand-sun/30 blur-2xl" aria-hidden />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-brand-soft/80 bg-brand-soft/70 text-4xl font-bold text-brand-deep">
              {(user?.name ?? "Guest").charAt(0)}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-brand-deep">
              {user?.name ?? "Guest"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground/80">
              {user?.email ?? "guest@matter.app"}
            </p>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3">
            <div className="rounded-2xl border border-brand-soft/70 bg-brand-soft/30 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep">
              使用 {usageDuration}
            </div>
            <div className="rounded-2xl border border-brand-soft/70 bg-brand-soft/30 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep">
              紀錄 {profileStats.records} 件事件
            </div>
            <div className="rounded-2xl border border-brand-soft/70 bg-brand-soft/30 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep">
              收藏 {profileStats.inspirations} 則靈感
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-[32px] border border-border/70 bg-white/95 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-brand-deep" strokeWidth={2.1} />
            <h3 className="text-lg font-semibold text-brand-deep">Collect Keys</h3>
          </div>
          <p className="text-sm text-muted-foreground/80">
            完成每日任務���解鎖鑰匙。累積鑰匙兌換限量徽章與高光時刻展示牆。
          </p>
          <Button className="mt-auto rounded-2xl bg-brand text-sm font-semibold tracking-[0.2em] text-white shadow-brand">
            即將推出
          </Button>
        </div>
        <div className="flex flex-col gap-3 rounded-[32px] border border-border/70 bg-white/95 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <Sparkle className="h-5 w-5 text-brand-deep" strokeWidth={2.1} />
            <h3 className="text-lg font-semibold text-brand-deep">Highlights</h3>
          </div>
          <p className="text-sm text-muted-foreground/80">
            以圖卡方式收藏你的亮點時刻，隨時重溫那些讓你感動的瞬間。
          </p>
          <Button variant="outline" className="mt-auto rounded-2xl border-2 border-brand text-sm font-semibold tracking-[0.2em] text-brand">
            預約測試
          </Button>
        </div>
        <div className="flex flex-col gap-3 rounded-[32px] border border-border/70 bg-white/95 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <UserPlus className="h-5 w-5 text-brand-deep" strokeWidth={2.1} />
            <h3 className="text-lg font-semibold text-brand-deep">Invite friends</h3>
          </div>
          <p className="text-sm text-muted-foreground/80">
            分享專屬連結，與夥伴一起養成紀錄習慣，查看彼此的努力軌跡。
          </p>
          <Button variant="ghost" className="mt-auto rounded-2xl text-sm font-semibold tracking-[0.2em] text-brand-deep hover:bg-brand-soft">
            生成邀請連結
          </Button>
        </div>
        <div className="flex flex-col gap-3 rounded-[32px] border border-border/70 bg-white/95 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5 text-brand-deep" strokeWidth={2.1} />
            <h3 className="text-lg font-semibold text-brand-deep">Next highlight</h3>
          </div>
          <p className="text-sm text-muted-foreground/80">
            下一個高光時刻預估會在 {formatDistanceToNow(nextHighlightDate, { addSuffix: true })} 出現，準備迎接新的驚喜。
          </p>
          <Button variant="ghost" className="mt-auto rounded-2xl text-sm font-semibold tracking-[0.2em] text-brand-deep hover:bg-brand-soft">
            設定提醒
          </Button>
        </div>
      </section>

      <section className="rounded-[32px] border border-border/70 bg-white/95 p-5 shadow-soft">
        <h3 className="text-lg font-semibold text-brand-deep">帳號設定</h3>
        <div className="mt-4 grid gap-3 text-sm text-brand-deep">
          <Button
            variant="outline"
            className="justify-start gap-3 rounded-2xl border border-brand-soft/80 bg-brand-soft/30 text-brand-deep hover:bg-brand-soft"
          >
            <CalendarHeart className="h-5 w-5" strokeWidth={2.1} />
            設定在日曆中的提醒事件
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-3 rounded-2xl border border-brand-soft/80 bg-brand-soft/30 text-brand-deep hover:bg-brand-soft"
          >
            <Sparkle className="h-5 w-5" strokeWidth={2.1} />
            關於 Matter
          </Button>
          <Button
            variant="destructive"
            className="justify-start gap-3 rounded-2xl text-sm font-semibold tracking-[0.2em]"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" strokeWidth={2.1} />
            登出帳號
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
