import * as React from "react";
import { FieldProps } from "formik";
import { TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

export const InputField: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  field,
  multiline
}) => {
  return <TextField placeholder={placeholder} required={true} {...field} multiline={multiline} margin="normal" rows="5" fullWidth variant="outlined"/>;
};