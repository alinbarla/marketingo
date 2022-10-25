import React, { useState, useEffect } from "react";
import { connect } from "frontity";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const CommentsSnackbar = ({ state }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("Comment submitted!");
  const [type, setType] = useState("success");

  const data = state.source.get(state.router.link);
  const commentForm = state.comments.forms[data.id];
  const isSubmitting = commentForm ? commentForm.isSubmitting : false;

  useEffect(() => {
    if (commentForm) {
      if (commentForm.isSubmitted && !commentForm.isError) {
        triggerSnackbar("Comment submitted!", "success");
      }

      if (!commentForm.isSubmitted && commentForm.isError) {
        triggerSnackbar(commentForm.errorMessage, "error");
      }
    }
  }, [isSubmitting]);

  const triggerSnackbar = (message, severity) => {
    setText(message);
    setType(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} variant="filled">
        {text}
      </Alert>
    </Snackbar>
  );
};

export default connect(CommentsSnackbar);
