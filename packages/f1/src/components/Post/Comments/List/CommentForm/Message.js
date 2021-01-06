import React from "react";

import InputGroup from "./InputGroup";
import TextArea from "./InputGroup/inputs/TextArea";

const Input = (props) => (
  <TextArea placeholder="Escribe aquí tu comentario" rows={8} {...props} />
);

const Email = (props) => <InputGroup name="content" Input={Input} {...props} />;

export default Email;
