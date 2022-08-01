import "../posts.css";
import moment from "moment";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const AwardToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgb(48,122,204)",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    background:
      "linear-gradient(to bottom, rgb(48,122,204) 0%, rgb(48,122,204) 35%, #fff 35%, #fff 100%)",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function CardNav(props) {
  return (
    <div className="card-nav">
      <div style={{ width: "4%", marginTop: "0.5%" }}>
        <img
          src={require("../../images/subreddit_icon.png")}
          alt="subreddit Icon"
          style={{ maxWidth: "80%" }}
        />
      </div>
      <div style={{ width: "87%" }}>
        <a
          href={"/" + props.subreddit}
          style={{ fontWeight: "bold" }}
          className="underline-link"
        >
          {props.subreddit}
        </a>
        <span style={{ color: "gray" }}>
          {" "}
          · Posted by{" "}
          <a
            href={"/user/" + props.author}
            className="post-author-name underline-link"
          >
            u/{props.author}
          </a>{" "}
          -{" "}
          <BootstrapTooltip
            disableFocusListener
            disableTouchListener
            placement="top"
            enterDelay={500}
            title={
              moment.unix(props.created_at).format("LLLL") +
              ", Indian Standard Time"
            }
          >
            <span>{moment.unix(props.created_at).fromNow()}</span>
          </BootstrapTooltip>
        </span>
        {props.awardings.map((award) => {
          return (
            <AwardToolTip
              title={
                <div className="tooltip">
                  <div>
                    <img
                      src={award.image}
                      alt={award.name}
                      className="award-image"
                    />
                  </div>
                  <div className="award-text">
                    <div className="award-name">{award.name}</div>
                    <div className="award-description">{award.description}</div>
                    <a
                      href="https://www.reddithelp.com/en/categories/reddit-101/reddit-basics/what-are-awards"
                      className="award-link"
                    >
                      How do I reward?
                    </a>
                  </div>
                </div>
              }
            >
              <img src={award.image} alt={award.name} className="award-image" />
            </AwardToolTip>
          );
        })}
      </div>
      <button className="post-join">Join</button>
    </div>
  );
}

export default CardNav;
