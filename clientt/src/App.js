import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import PenIcon from "@material-ui/icons/Create";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PostsList } from "./components/PostsList";
import AddPostForm from "./components/AddPostForm"
import { useDispatch } from "react-redux";
import { fetchPosts } from "./actions/post"
import PostDetails from "./components/PostDetails";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(fetchPosts()); 
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" electron={0}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.container}
              color="inherit"
            />
            <Typography
              variant="h6"
              color="secondary"
              className={classes.title}
            >
              <a href="https://blogify-frontend-den.herokuapp.com/posts">Blogcu</a>
            </Typography>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<PenIcon />}
              onClick={handleOpen}
            >
              Add new post
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Router>
            <Switch>
              <Route exact path="/posts" component={PostsList} />
              <Route exact path="/posts/:id" component={PostDetails} />
            </Switch>

            <Redirect from="/" to="/posts" />
          </Router>
        </Grid>
      </Container>

      <AddPostForm open={open} handleClose={handleClose} />
    </>
  );
};

export default App;