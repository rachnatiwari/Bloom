import "./subreddit.css";

export default function Banner(props) {
  const banner_background_img = "url(" + props.banner_img + ") no-repeat center / cover";
  return (
    <div className="subreddit_page_banner">
      <div
        className="banner_background_img"
        style={{
            // background:'url(https://styles.redditmedia.com/t5_2qp4r/styles/bannerBackgroundImage_0l1xc75i78d31.jpg) no-repeat center / cover',
            background: banner_background_img
        }}
      >
      </div>
      <div className="banner_navbar">
        <img src={props.icon_img} alt={props.display_name} className='banner_navbar_icon'/>
        <div className="banner_navabr_info">
          <div className="banner_navbar_title">{props.title} <button className="banner_navbar_join_button" style={{backgroundColor:props.primary_color}}>Join</button></div>
          <div className="banner_navbar_name">{props.display_name}</div>
          <div className="banner_navbar_options" style={{color:props.primary_color}}>
            <span>POSTS</span>
            <span>WIKI</span>
            <span>RULES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
