import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

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
    <FormControl component="fieldset" sx={{ width: "100%", height: "50px" }}>
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

export const SelectBrand = (props) => {
  return (
    <FormControl variant="outlined" size="medium" fullWidth>
      <InputLabel id="serviceBrand-label">Ürün Markası</InputLabel>
      <Select
        sx={{ bgcolor: "white" }}
        labelId="serviceBrand-label"
        id="serviceBrand"
        name="serviceBrand"
        label="Ürün Markası"
        required
        value={props.value}
        onChange={props.onChange}
      >
        <MenuItem value="Arçelik">Arçelik</MenuItem>
        <MenuItem value="Beko">Beko</MenuItem>
        <MenuItem value="Altus">Altus</MenuItem>
        <MenuItem value="Grundig">Grundig</MenuItem>
        <MenuItem value="Bosch">Bosch</MenuItem>
        <MenuItem value="Siemens">Siemens</MenuItem>
        <MenuItem value="Profilo">Profilo</MenuItem>
        <MenuItem value="Vestel">Vestel</MenuItem>
        <MenuItem value="Regal">Regal</MenuItem>        
        <MenuItem value="Finlüx">Finlüx</MenuItem>
        <MenuItem value="Electrolüx">Electrolüx</MenuItem>
        <MenuItem value="Samsung">Samsung</MenuItem>
        <MenuItem value="Lg">Lg</MenuItem>
        <MenuItem value="DemirDöküm">DemirDöküm</MenuItem>
        <MenuItem value="Baymak">Baymak</MenuItem>
        <MenuItem value="Ferroli">Ferroli</MenuItem>
        <MenuItem value="Eca">Eca</MenuItem>
        <MenuItem value="Buderus">Buderus</MenuItem>
        <MenuItem value="Airfel">Airfel</MenuItem>
        <MenuItem value="Philips">Philips</MenuItem>
        <MenuItem value="Fantom">Fantom</MenuItem>
        <MenuItem value="Fakir">Fakir</MenuItem>
        <MenuItem value="Arzum">Arzum</MenuItem>
        <MenuItem value="Dayson">Dayson</MenuItem>
        <MenuItem value="Diğer">Diğer</MenuItem>
      </Select>
    </FormControl>
  );
};

export const SelectModel = (props) => {
  return (
    <FormControl variant="outlined" size="medium" fullWidth>
    <InputLabel id="serviceModel-label">Ürün</InputLabel>
    <Select
      sx={{ bgcolor: "white" }}
      labelId="serviceModel-label"
      id="serviceModel"
      name="serviceModel"
      label="Ürün"
      required
      value={props.value}
      onChange={props.onChange}
    >
      <MenuItem value="Çamaşır Makinesi">Çamaşır Makinesi</MenuItem>
      <MenuItem value="Bulaşık Makinesi">Bulaşık Makinesi</MenuItem>
      <MenuItem value="Buzdolabı">Buzdolabı</MenuItem>
      <MenuItem value="Kombi">Kombi</MenuItem>
      <MenuItem value="Klima">Klima</MenuItem>
      <MenuItem value="Elektrikli Süpürge">
        Elektrikli Süpürge
      </MenuItem>
      <MenuItem value="Ocak">Ocak</MenuItem>
      <MenuItem value="Fırın">Fırın</MenuItem>
      <MenuItem value="Derin Dondurucu (Difriz)">
        Derin Dondurucu (Difriz)
      </MenuItem>
      <MenuItem value="Hermetik Sofben">Hermetik Şofben</MenuItem>
      <MenuItem value="Diğer">Diğer</MenuItem>
    </Select>
  </FormControl>
  );
};