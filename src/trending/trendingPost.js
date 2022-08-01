import "./trending.css";

function trendingPost(props) {
  let trimmed_title = props.post.title.substring(0,81)
  let subreddit_link = 'https://www.reddit.com/'+props.post.sub_reddit
  return (
    <div>
      <a href={props.post.url} className="post-name">{trimmed_title<props.post.title?(trimmed_title+'...'):trimmed_title}</a>
      <a href={subreddit_link} className="subreddit-name">{props.post.sub_reddit}</a>
    </div>
  );
}

export default trendingPost;
