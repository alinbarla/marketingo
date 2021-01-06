import React from "react";

import InputGroup from "./InputGroup";
import InputColumn from "./InputGroup/inputs/InputGrid/InputColumn";

const NameInput = (props) => <InputColumn placeholder="Nombre*" {...props} />;

const Name = (props) => (
  <InputGroup name="authorName" Input={NameInput} {...props} />
);

export default Name;
