import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/post" 

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    console.log({...data, file});
    dispatch(createPost({ ...data, image: file }));
    clearForm();
  };

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a new post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>

        <div className={classes.root}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="title"
              label="Title"
              name="title"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.title ? true : false}
              fullWidth
            />
            <TextField
              id="subtitle"
              label="Subtitle"
              name="subtitle"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.subtitle ? true : false}
              fullWidth
            />

            <Controller
              as={
                <Select
                  input={<Input />}
                  className={classes.textField}
                  fullWidth
                >
                  {tags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              }
              name="tag"
              control={control}
              error={errors.tag ? true : false}
              defaultValue={tags[0]}
            />
            <TextField
              id="content"
              label="Content"
              name="content"
              variant="outlined"
              multiline
              rows={4}
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.content ? true : false}
              fullWidth
            />
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={clearForm}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm;