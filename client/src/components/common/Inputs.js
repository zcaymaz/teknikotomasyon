import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";

export const FormInput = (props) => {
  return (
    <>
      <TextField
        className="FormInput"
        size={props.size || "small"}
        label={props.label}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        text={props.text}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </>
  );
};
export const ServiceTypeInput = ({ value, onChange }) => {
  return (
    <FormControl component="fieldset" sx={{width:'100%',height:'50px'}}>
      <FormLabel component="legend">Atölye/Servis</FormLabel>
      <RadioGroup value={value} onChange={onChange} row>
        <FormControlLabel value="Atölye" control={<Radio />} label="Atölye" />
        <FormControlLabel value="Servis" control={<Radio />} label="Servis" />
      </RadioGroup>
    </FormControl>
  );
};

export const MultilineInput = (props) => {
  return (
    <>
      <TextField
        className="MultilineInput"
        multiline
        rows={props.rows}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        text={props.text}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </>
  );
};

export const MultilineFormInput = (props) => {
  return (
    <>
      <TextField
        className="MultilineInput"
        id="outlined-multiline-static"
        label={props.label}
        multiline
        rows={3}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </>
  );
};
