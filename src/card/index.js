import "./card.css";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import Footer from "./footer";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CardNav from "./navbar";


function Card(props) {
  let votes = parseFloat(props.votes);
  return (
    <div className="card">
      <a href={props.global_link} className="vote">
      <div >
        <div>
          <ArrowUpwardRoundedIcon fontSize="medium" color="disabled" />
        </div>
        {votes > 1000 ? (votes / 1000).toFixed(1) + "k" : votes}
        <div>
          <ArrowDownwardRoundedIcon
            fontSize="medium"
            color="disabled"
            style={{ marginTop: "10%" }}
          />
        </div>

      </div>
      </a>
      <div className="card-body">
        <a href={props.global_link}>
        <CardNav
          subreddit = {props.subreddit}
          author = {props.author}
          created_at = {props.created_at}
          awardings = {props.awardings}
        />
        <div className="title">{props.title}</div>
        <div className="content">
          {props.desc}
          {props.display_link ? (
            <a
              href={props.display_link}
              className="display_link"
              target="_blank"
              rel="noreferrer"
            >
              {props.display_link.substring(8, 40)}...
              <OpenInNewIcon fontSize="0.6rem" />
            </a>
          ) : props.video ? (
            <iframe
              src={props.video.url}
              height={props.video.height}
              width={props.video.width}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={props.title.substring(0, 100)}
              className="video"
            />
          ) : (
            props.image && (
              <img
                src={props.image}
                style={{ maxWidth: "100%" }}
                alt={props.title.substring(0, 100)}
              />
            )
          )}
        </div>
        </a>
        {console.log(props.comments)}
        <Footer saved={props.saved} comments={props.comments} />
      </div>
    </div>
  );
}

export default Card;
