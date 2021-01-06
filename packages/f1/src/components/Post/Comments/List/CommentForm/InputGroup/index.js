import React from "react";
import { connect } from "frontity";

const InputGroup = ({ Input, actions, state, postId, name }) => {
  const handleChange = (event) => {
    actions.comments.updateFields(postId, {
      [name]: event.target.value,
    });
  };

  const getFormValue = () => {
    const { [postId]: form } = state.comments.forms;
    if (form && form.fields) {
      return form.fields[name] || "";
    }
    return "";
  };

  return <Input onChange={handleChange} value={getFormValue()} />;
};

export default connect(InputGroup);
