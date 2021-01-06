import React from "react";

import InputGroup from "./InputGroup";
import BaseInput from "./InputGroup/inputs/Input";

const Input = (props) => <BaseInput placeholder="Tu sitio web" {...props} />;

const Website = (props) => <InputGroup name="url" Input={Input} {...props} />;

export default Website;
