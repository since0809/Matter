import { useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, Eye, Search, Share2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inspireArticles } from "@/features/matter/data/mockData";

const InspirePage = () => {
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const filteredArticles = useMemo(() => {
    return inspireArticles.filter((article) => {
      const matchesQuery = `${article.title} ${article.description}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFavorite = onlyFavorites ? article.favorited : true;
      return matchesQuery && matchesFavorite;
    });
  }, [search, onlyFavorites]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border/70 bg-white/95 p-5 shadow-soft">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
              Inspire feed
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-deep">
              靈感補給站
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground/80">
              由內容策展團隊即時更新，挑選最適合你進一步探索的文章與新知。
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 rounded-3xl border border-brand-soft/70 bg-brand-soft/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-deep">
            <BookmarkCheck className="h-4 w-4" strokeWidth={2.1} />
            收藏 {inspireArticles.filter((article) => article.favorited).length}
          </div>
        </header>

        <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-brand-deep/60" strokeWidth={2.1} />
            <Input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜尋文章或關鍵字"
              className="h-14 w-full rounded-3xl border border-border/80 bg-white pl-12 text-base font-semibold text-brand-deep placeholder:text-muted-foreground/70"
            />
          </label>
          <Button
            type="button"
            variant={onlyFavorites ? "default" : "outline"}
            onClick={() => setOnlyFavorites((prev) => !prev)}
            className={`h-14 rounded-3xl border-2 text-base font-semibold tracking-[0.18em] ${onlyFavorites ? "bg-brand text-white" : "border-brand text-brand"}`}
          >
            <Bookmark className="mr-2 h-5 w-5" strokeWidth={2.1} />
            只顯示收藏
          </Button>
        </div>
      </section>

      <section className="space-y-5">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="overflow-hidden rounded-[32px] border border-border/70 bg-white/95 shadow-soft transition hover:-translate-y-1 hover:shadow-brand"
          >
            <div className="grid gap-0 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep">
                  {article.source}
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4 p-6">
                <div>
                  <header className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold text-brand-deep">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80">
                      {article.description}
                    </p>
                  </header>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-4 w-4" strokeWidth={2.1} />
                      {article.views.toLocaleString()} views
                    </span>
                    <span>更新 {format(new Date(article.updatedAt), "yyyy/MM/dd")}</span>
                    {article.favorited && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft/50 px-3 py-1 text-brand-deep">
                        <BookmarkCheck className="h-4 w-4" strokeWidth={2.1} />
                        收藏中
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button className="flex-1 rounded-2xl bg-brand text-base font-semibold tracking-[0.25em] text-white shadow-brand hover:brightness-110">
                    閱讀全文
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl border-2 border-brand text-base font-semibold tracking-[0.2em] text-brand hover:bg-brand hover:text-white"
                  >
                    <Bookmark className="mr-2 h-5 w-5" strokeWidth={2.1} />
                    收藏
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-2xl border border-transparent text-base font-semibold tracking-[0.2em] text-brand-deep hover:bg-brand-soft"
                  >
                    <Share2 className="mr-2 h-5 w-5" strokeWidth={2.1} />
                    分享
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {filteredArticles.length === 0 && (
          <div className="rounded-3xl border border-dashed border-brand-soft/70 bg-brand-soft/30 px-6 py-12 text-center text-sm font-semibold text-brand-deep">
            沒有符合的靈感內容，換個搜尋詞或取消收藏篩選看看。
          </div>
        )}
      </section>
    </div>
  );
};

export default InspirePage;
