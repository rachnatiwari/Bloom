import * as React from "react";
import moment from "moment";
import { redditApi } from "../lib/api";

interface SidebarProps { subreddit?: string }

type Rule = { short_name: string; description?: string };
type Moderator = { name: string; icon_img?: string };

export default function Sidebar({ subreddit }: SidebarProps) {
  const [about, setAbout] = React.useState<any | null>(null);
  const [rules, setRules] = React.useState<Rule[]>([]);
  const [mods, setMods] = React.useState<Moderator[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [expandedRule, setExpandedRule] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!subreddit) return;
    setError(null);
    const sr = String(subreddit).replace(/^\//, "").replace(/^r\//i, "");
    Promise.all([
      redditApi.getSubredditAbout(sr).catch((e) => ({ error: e })),
      redditApi.getSubredditRules(sr).catch((e) => ({ error: e })),
      redditApi.getSubredditModerators(sr).catch((e) => ({ error: e })),
    ]).then(([aboutRes, rulesRes, modsRes]: any[]) => {
      if (aboutRes?.error) setError("Failed to load subreddit info");
      setAbout(aboutRes?.data ?? null);
      const r = rulesRes?.rules ?? rulesRes?.data?.rules ?? [];
      setRules(Array.isArray(r) ? r : []);
      const mChildren = modsRes?.data?.children ?? [];
      setMods(
        mChildren.map((c: any) => ({ name: c.name || c?.mod?.name || c?.data?.name, icon_img: c?.icon_img || c?.data?.icon_img })).filter((x: any) => x?.name)
      );
    });
  }, [subreddit]);

  return (
    <aside className="space-y-4">
      {/* Actions */}
      <div className="rounded-lg bg-accent text-foreground p-4 shadow border border-gray-200">
        <div className="flex gap-3">
          <a href={`/r/${subreddit}/submit`} className="flex-1 text-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            + Create Post
          </a>
          <button className="flex-1 rounded-full bg-pink-600 text-white px-4 py-2 text-sm font-semibold hover:bg-pink-700">Join</button>
        </div>
      </div>

      {/* About */}
      <div className="rounded-lg bg-accent text-foreground p-4 shadow border border-gray-200">
        <div>
          <div className="text-pink-600 font-semibold uppercase tracking-wide">{about?.title || subreddit?.toUpperCase()}</div>
          {about?.public_description && (
            <div className="text-gray-700">{about.public_description}</div>
          )}
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-lg font-semibold text-gray-900">{(about?.subscribers || 0).toLocaleString()}</div>
              <div className="text-gray-500 text-xs">Members</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{(about?.active_user_count || about?.accounts_active || 0).toLocaleString()}</div>
              <div className="text-gray-500 text-xs flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-500" /> Online
              </div>
            </div>
          </div>
          {about?.created_utc && (
            <div className="mt-3 text-xs text-gray-500">Created {moment(about.created_utc * 1000).format("ll")}</div>
          )}
        </div>
      </div>

      {/* Rules */}
      {rules.length > 0 && (
        <div className="rounded-lg bg-accent text-foreground p-4 shadow border border-gray-200">
          <div className="text-pink-600 font-semibold uppercase tracking-wide">r/{String(subreddit).replace(/^r\//i, "")} Rules</div>
          <ul className="mt-3 divide-y divide-gray-200">
            {rules.map((rule, idx) => (
              <li key={idx} className="py-3">
                <button
                  className="w-full text-left flex items-center justify-between gap-2 hover:text-gray-900"
                  onClick={() => setExpandedRule(expandedRule === idx ? null : idx)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-gray-500">{idx + 1}</span>
                    <span className="font-medium">{rule.short_name}</span>
                  </div>
                  <span className="text-gray-500">{expandedRule === idx ? "▴" : "▾"}</span>
                </button>
                {expandedRule === idx && rule.description && (
                  <p className="mt-2 text-sm text-gray-700">{rule.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Moderators */}
      {mods.length > 0 && (
        <div className="rounded-lg bg-accent text-foreground p-4 shadow border border-gray-200">
          <div className="text-pink-600 font-semibold uppercase tracking-wide">Moderators</div>
          <a href={`https://www.reddit.com/message/compose?to=/r/${String(subreddit).replace(/^r\//i, "")}`} target="_blank" rel="noreferrer" className="mt-3 block text-center rounded-full bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800">
            Message Mods
          </a>
          <ul className="mt-3 space-y-2">
            {mods.slice(0, 6).map((m, i) => (
              <li key={i} className="flex items-center gap-2">
                <img src={m.icon_img || "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                <a href={`/user/${m.name}`} className="hover:underline">u/{m.name}</a>
              </li>
            ))}
          </ul>
          {mods.length > 6 && (
            <a href={`https://www.reddit.com/r/${String(subreddit).replace(/^r\//i, "")}/about/moderators`} target="_blank" rel="noreferrer" className="mt-3 block text-center rounded-full bg-pink-600 text-white px-4 py-2 text-sm font-medium hover:bg-pink-700">
              View all moderators
            </a>
          )}
        </div>
      )}
    </aside>
  );
}
