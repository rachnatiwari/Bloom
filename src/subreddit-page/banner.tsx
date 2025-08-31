import * as React from "react";
import subredditIcon from "../images/subreddit_icon.png";

type BannerProps = {
    banner_img?: string | undefined;
    banner_url?: string | undefined;
    banner_background_color?: string | undefined;
    title?: string | undefined;
    display_name?: string | undefined;
    icon_url?: string | undefined;
};

export default function Banner({ banner_img, banner_url, banner_background_color, title, display_name, icon_url }: BannerProps) {
        const src = (banner_url && banner_url.trim().length > 0 ? banner_url : banner_img) || "";
        const backgroundImage = src.startsWith("url(") ? src : src ? `url(${src})` : "";
        const bgStyle: React.CSSProperties = src
            ? {
                    backgroundImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }
        : banner_background_color
        ? { backgroundColor: banner_background_color }
        : { background: "linear-gradient(90deg,#fce7f3,#e9d5ff)" };

        return (
            <section className="rounded-lg overflow-hidden shadow border relative" style={{ minHeight: 120 }}>
                <div className="h-28 w-full" style={bgStyle} />
                <div className="p-4 bg-white">
                    <div className="flex items-center gap-3">
                        <img
                            src={(icon_url && icon_url.trim().length > 0 ? icon_url : "") || (subredditIcon as any)}
                            alt="subreddit icon"
                            className="w-12 h-12 rounded-full border object-cover -mt-10 bg-white"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = subredditIcon as any;
                            }}
                        />
                        <div>
                            <div className="text-lg font-semibold">{title || display_name || "Subreddit"}</div>
                            {display_name && (
                                <div className="text-sm text-gray-600">{`r/${(display_name || "").replace(/^r\//, "")}`}</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
}
