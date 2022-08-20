import "./posts.css";
import NavBar from "./navbar";
import Card from "../card";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Posts() {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAPI();
    console.log('in use effect - '+posts.length);
  }, []);

  async function fetchAPI(initial) {
    console.log('1');
    fetch("https://www.reddit.com/hot.json?after"+posts.length )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        let raw_data = data.data.children;
        console.log('raw data length - '+raw_data.length);
        let arr = posts.length>0?posts:[];

        raw_data.map((item) => {
          let post = {};
          post.title = item.data.title;
          post.id = item.data.id;
          post.saved = item.data.saved;
          post.subreddit = item.data.subreddit_name_prefixed;
          post.votes = item.data.ups;
          post.author = item.data.author;
          post.comments = item.data.num_comments;
          post.local_link = item.data.perma_link;
          post.global_link = item.data.url;
          post.created_at = item.data.created_utc;
          post.subreddit_subscribers = item.data.subreddit_subscribers;
          post.links = item.data.link_flair_text;
          post.image = item.data.url_overridden_by_dest;
          // post.desc = item.data.link_flair_type==='richtext'?item.data.selftext_html:item.data.selftext;
          post.desc = item.data.selftext;
          post.video = item.data.is_video
            ? {
                url: item.data.media.reddit_video["fallback_url"],
                height: item.data.media.reddit_video["height"],
                width: item.data.media.reddit_video["width"],
              }
            : null;
          post.display_link = item.data.post_hint==='link'?item.data.url_overridden_by_dest:null;
          post.awardings =[];
          item.data.all_awardings.map(award => {
            let post_award={};
            post_award.image = award.icon_url;
            post_award.name = award.name;
            post_award.description = award.description;
            post.awardings.push(post_award);
          })
          arr.push(post);
        });
        setPosts(arr);
      });
  }

  function fetchMoreData(){
    console.log('in fetch more data');
    let prev_arr = posts;
    fetchAPI();
    posts.map(item => {
      prev_arr.push(item)
    })
    console.log('in fetch more data - '+posts.length);
    setPosts(prev_arr);
    console.log('after setting new data - '+posts.length);
  }

  return (
    <div className="posts">
      <NavBar />
      {/* <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      > */}
        {/* {console.log('inside infinite scroll - '+posts.length)} */}
        {posts &&
          posts.map((post) => {
            return (
              <Card
                title={post.title}
                saved={post.saved}
                subreddit={post.subreddit}
                votes={post.votes}
                author={post.author}
                comments={post.comments}
                local_link={post.local_link}
                global_link={post.global_link}
                created_at={post.created_at}
                subreddit_subscribers={post.subreddit_subscribers}
                image={post.image}
                desc={post.desc}
                video={post.video}
                display_link={post.display_link}
                awardings={post.awardings}
              />
            );
          })}
      {/* </InfiniteScroll> */}
    </div>
  );
}

export default Posts;
