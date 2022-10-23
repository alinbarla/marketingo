import React from "react";

import InputGroup from "./InputGroup";
import InputColumn from "./InputGroup/inputs/InputGrid/InputColumn";

const Input = (props) => (
  <InputColumn placeholder="Indirizzo email*" {...props} />
);

const Email = (props) => (
  <InputGroup name="authorEmail" Input={Input} {...props} />
);

export default Email;
