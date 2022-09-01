import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import moment from "moment";
  import React from "react";
  import { Link } from "react-router-dom";
  import noImage from "../images/noimage.svg"
  
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 374,
      position: "relative",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backgroundBlendMode: "darken",
    },
  
    overlay: {
      position: "absolute",
      top: "20px",
      left: "20px",
      color: "white",
    },
    chip: {
      marginTop: theme.spacing(1),
    },
  }));
  
  const Post = ({ _id, title, subtitle, content, tag, image, createdAt }) => {
    const convertRelativeTime = (date) => {
      return moment(date).fromNow();
    };
  
    const classes = useStyles();
  
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={image || noImage}
          title="image"
        />
        <div className={classes.overlay}>
          <Typography variant="h6">Semih</Typography>
          <Typography variant="body2">
            {convertRelativeTime(createdAt)}
          </Typography>
        </div>
        <CardContent>
          <Typography variant="h6" component="p" gutterBottom>
            {title.substring(0,30) + "..."}
          </Typography>
          <Typography variant="overline" component="p" gutterBottom>
            {subtitle}
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {content.substring(0, 180) + "..."}
          </Typography>
          <Chip label={` # ${tag}`} variant="outlined" className={classes.chip} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <Link to={`/posts/${_id}`}>More</Link>
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default Post;