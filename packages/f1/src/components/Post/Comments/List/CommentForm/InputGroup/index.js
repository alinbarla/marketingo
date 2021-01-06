import React from "react";
import { connect } from "frontity";

const InputGroup = ({ Input, actions, postId, name }) => {
  const handleChange = (event) => {
    actions.comments.updateFields(postId, {
      [name]: event.target.value,
    });
  };
  return <Input onChange={handleChange} />;
};

export default connect(InputGroup);
