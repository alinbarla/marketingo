import React from "react";

import InputGroup from "./InputGroup";
import InputColumn from "./InputGroup/inputs/InputGrid/InputColumn";

const Input = (props) => (
  <InputColumn placeholder="Correo electronico" {...props} />
);

const Email = (props) => (
  <InputGroup name="authorEmail" Input={Input} {...props} />
);

export default Email;
