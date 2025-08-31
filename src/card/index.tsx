import * as React from "react";
import { ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import Footer from "./footer";
import CardNav from "./navbar";

interface CardProps {
  votes: number | string;
  global_link: string;
  subreddit: string;
  author: string;
  created_at: number;
  awardings: any[];
  subreddit_page?: boolean;
  title: string;
  desc?: string;
  display_link?: string;
  video?: { url: string; height: number; width: number };
  image?: string;
  saved?: boolean;
  comments: number;
}

const Card: React.FC<CardProps> = (props) => {
  let votes = parseFloat(props.votes as string);
  return (
  <div className="my-4 bg-white rounded-lg flex border border-gray-200 max-w-[600px] w-full self-start">
      <a href={props.global_link} className="bg-gray-100 rounded-l-lg text-xs font-bold flex flex-col items-center justify-center px-2 py-4 transition-colors">
  <ThumbsUp className="h-5 w-5 text-gray-400" />
        <span className="my-1">{votes > 1000 ? (votes / 1000).toFixed(1) + "k" : votes}</span>
  <ThumbsDown className="h-5 w-5 text-gray-400 mt-2" />
      </a>
  <div className="p-4 w-full hover:bg-pink-50 transition-colors group">
        <CardNav
          subreddit={props.subreddit}
          author={props.author}
          created_at={props.created_at}
          awardings={props.awardings}
          {...(props.subreddit_page !== undefined ? { subreddit_page: props.subreddit_page } : {})}
        />
        <a href={props.global_link} className="block">
          <div className="mt-4 text-xl font-medium">{props.title}</div>
          <div className="my-4">
            {props.desc}
            {props.display_link ? (
              <a
                href={props.display_link}
                className="text-sm text-blue-600 hover:underline inline-flex items-center ml-2"
                target="_blank"
                rel="noreferrer"
              >
                {props.display_link.substring(8, 40)}...
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            ) : props.video ? (
              <div
                className="w-full max-w-[600px] max-h-[600px]"
                style={{ aspectRatio: `${props.video.width} / ${props.video.height}` }}
              >
                <iframe
                  src={props.video.url}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={props.title.substring(0, 100)}
                  className="w-full h-full rounded-md"
                />
              </div>
            ) : (
              props.image && (
                <img
                  src={props.image}
                  className="w-full max-w-[600px] max-h-[600px] object-contain"
                  alt={props.title.substring(0, 100)}
                />
              )
            )}
          </div>
        </a>
        <Footer saved={!!props.saved} comments={props.comments} />
      </div>
    </div>
  );
};

export default Card;
