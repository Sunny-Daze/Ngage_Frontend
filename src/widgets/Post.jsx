import React from "react";
import Chip from "../widgets/Chip";
import "./Post.css";
import "../index.css";
import { IconButton, Typography, Avatar, Button } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { grey } from "@mui/material/colors";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDate from "../utils/dateFormater";
import { FavoriteRounded } from "@mui/icons-material";
import { domain, endPoints } from "../services/endPoints";
import axios from "axios";
import { FavoriteBorderRounded } from "@mui/icons-material";

async function likeAndUnLikePost(liked, postId) {
  let url = liked
    ? `${domain}${endPoints.unlikePost}`
    : `${domain}${endPoints.likePost}`;
  let token = localStorage.getItem("token");
  let response = await axios.post(
    url,
    { post: postId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

async function deletePost(postId, deletePostFunction) {
  let userDetails = JSON.parse(localStorage.getItem("user") ?? "");
  if (userDetails.role == "Admin" || userDetails.role == "SuperAdmin" ) {
    let url = `${domain}${endPoints.deletePost}`;
    let token = localStorage.getItem("token");
    let response = await axios.post(
      url,
      { post: postId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    deletePostFunction(postId);
  }
}

function Post(props) {
  let [likedButton, setLikeButton] = React.useState(props.liked);
  let [likeCounts, setLikeCount] = React.useState(props.likeCounts);

  // console.warn(likeCounts);

  return (
    <div className="PostCard">
      <div className="postUtils">
        <div className="postUtilsIcons">
          <IconButton
            onClick={() => {
              likeAndUnLikePost(likedButton, props.id);
              setLikeButton(!likedButton);
              setLikeCount(likedButton ? (likeCounts -= 1) : (likeCounts += 1));
            }}
            style={{ paddingBottom: "0px" }}
          >
            {likedButton && (
              <FavoriteRounded style={{ fontSize: "1.85rem", color: "red" }} />
            )}
            {!likedButton && (
              <FavoriteBorderRounded
                style={{ fontSize: "1.85rem", color: "grey" }}
              />
            )}
          </IconButton>

          <Typography
            variant="body2"
            style={{
              color: "darkslategray",
              textAlign: "center",
              marginRight: "2px",
            }}
          >
            {likeCounts}
          </Typography>
          <IconButton style={{ paddingBottom: "0px" }}>
            <CommentIcon style={{ fontSize: "1.7rem" }} />
          </IconButton>
          <Typography
            variant="body2"
            style={{
              color: "darkslategray",
              textAlign: "center",
              marginRight: "2px",
            }}
          >
            0
          </Typography>
          <IconButton>
            <BookmarkBorderIcon style={{ fontSize: "1.8rem" }} />
          </IconButton>
        </div>
      </div>

      <div className="postCardBody">
        <div className="postHeader">
          <Avatar
            sx={{ bgcolor: grey[450], height: "3.2rem", width: "3.2rem" }}
          ></Avatar>
          <div className="postHeaderName">
            <Typography
              variant="body1"
              style={{ fontSize: "1rem", lineHeight: "1.5rem" }}
            >
              {props.user.userName}
            </Typography>
            <Typography variant="body2">
              {formatDate(new Date(props.createdAt))}
            </Typography>
          </div>
        </div>

        <div className="postCaption">
          <Typography
            variant="body2"
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            {props.title}
          </Typography>
          {props.category !== "" && <Chip title={props.category} />}
        </div>

        <div className="postContent">
          <div className="postContentBody">
            <Typography variant="body1" style={{ fontSize: "0.9rem" }}>
              <div dangerouslySetInnerHTML={{ __html: props.content }} />{" "}
            </Typography>
          </div>
          <div className="postContentImage">
            {/* <img src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" alt="" /> */}
          </div>
        </div>

        <div className="postfooter">
          <Button
            variant="outlined"
            style={{
              borderColor: "#001f54",
              marginRight: "1rem",
              color: "#001f54",
              height: "1.8rem",
              fontSize: "0.75rem",
            }}
            size="small"
          >
            see more <ChevronRightIcon />
          </Button>
          <Button
            onClick={() => deletePost(props.id, props.deletePostFromPosts)}
            variant="outlined"
            color="error"
            style={{
              borderColor: "red",
              height: "1.8rem",
              fontSize: "0.75rem",
              color: "red",
            }}
            size="small"
          >
            DELETE POST
            <DeleteIcon
              style={{ fontSize: "1.1rem", marginLeft: "0.5rem", color: "red" }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Post;
