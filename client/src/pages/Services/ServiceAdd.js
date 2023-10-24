import React, { useState } from "react";
import { Grid, Stack, Typography, Divider, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { FormInput, MultilineFormInput, ServiceTypeInput } from "../../components/common/Inputs";
import axios from "axios";
import CustomButton from "../../components/common/CustomButton";

const ServiceAdd = () => {
  const [serviceName, setserviceName] = useState("");
  const [serviceGsmno, setserviceGsmno] = useState("");
  const [serviceAddress, setserviceAddress] = useState("");
  const [serviceDesc, setserviceDesc] = useState("");
  const [serviceBrand, setserviceBrand] = useState("");
  const [serviceModel, setserviceModel] = useState("");
  const [serviceType, setserviceType] = useState("");
  const [servicePrice, setservicePrice] = useState("");

  const createService = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://89.116.52.58:3001/api/service/", {
        name: localStorage.getItem('name'),
        serviceName: serviceName,
        serviceGsmno: serviceGsmno,
        serviceAddress: serviceAddress,
        serviceDesc: serviceDesc,
        serviceBrand: serviceBrand,
        serviceModel: serviceModel,
        serviceType: serviceType,
        servicePrice: servicePrice,
      });

      setserviceName("");
      setserviceGsmno("");
      setserviceAddress("");
      setserviceDesc("");
      setserviceBrand("");
      setserviceModel("");
      setserviceType("");
      setservicePrice("");
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <Grid container direction="row" p={3}>
        <Grid container direction="row" justifyContent="center" pb={2}>
          <Typography pt={2} pb={1} sx={{ fontSize: "32px", color: "#0f0f0f", marginTop: '50px' }} >
            Servis Ekle
          </Typography>
          <Divider sx={{ width: "100%", border: "1px solid #dedede" }} />
        </Grid>
        <Grid p={5} item xs={12} bgcolor="#f0f0f0">
          <form onSubmit={createService}>
            <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} gap={2} padding={1}>
              <FormInput
                size="medium"
                label="Müşteri İsmi"
                name="serviceName"
                id="serviceName"
                value={serviceName}
                required
                onChange={(e) => setserviceName(e.target.value)}
              />
              <FormInput
                size="medium"
                label="Müşteri Tel No"
                name="serviceGsmno"
                id="serviceGsmno"
                value={serviceGsmno}
                type="number"
                required
                onChange={(e) => {
                  if (e.target.value.length <= 11) {
                    setserviceGsmno(e.target.value);
                  }
                }}
              />
            </Stack>
            <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} gap={2} padding={1}>
              <MultilineFormInput
                label="Açıklama"
                name="serviceDesc"
                id="serviceDesc"
                value={serviceDesc}
                required
                onChange={(e) => setserviceDesc(e.target.value)}
              />
              <MultilineFormInput
                label="Adres"
                name="serviceAddress"
                id="serviceAddress"
                value={serviceAddress}
                required
                onChange={(e) => setserviceAddress(e.target.value)}
              />
            </Stack>
            <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} gap={2} padding={1}>
              <FormControl variant="outlined" size="medium" fullWidth>
                <InputLabel id="serviceBrand-label">Ürün Markası</InputLabel>
                <Select
                  sx={{ bgcolor: 'white' }}
                  labelId="serviceBrand-label"
                  id="serviceBrand"
                  label="Ürün Markası"
                  value={serviceBrand}
                  required
                  onChange={(e) => setserviceBrand(e.target.value)}
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
                  <MenuItem value="Ariston">Ariston</MenuItem>
                  <MenuItem value="Indesit">İndesit</MenuItem>
                  <MenuItem value="Electrolüx">Electrolüx</MenuItem>
                  <MenuItem value="Samsung">Samsung</MenuItem>
                  <MenuItem value="Baymak">Baymak</MenuItem>
                  <MenuItem value="Demirdöküm">Demirdöküm</MenuItem>
                  <MenuItem value="Viessman">Viessman</MenuItem>
                  <MenuItem value="Ferroli">Ferroli</MenuItem>
                  <MenuItem value="Buderus">Buderus</MenuItem>
                  <MenuItem value="Vaillant">Vaillant</MenuItem>
                  <MenuItem value="Airfel">Airfel</MenuItem>
                  <MenuItem value="Protherm">Protherm</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" size="medium" fullWidth>
                <InputLabel id="serviceModel-label">Ürün</InputLabel>
                <Select
                  sx={{ bgcolor: 'white' }}
                  labelId="serviceModel-label"
                  id="serviceModel"
                  label="Ürün"
                  value={serviceModel}
                  required
                  onChange={(e) => setserviceModel(e.target.value)}
                >
                  <MenuItem value="Çamaşır Makinesi">Çamaşır Makinesi</MenuItem>
                  <MenuItem value="Bulaşık Makinesi">Bulaşık Makinesi</MenuItem>
                  <MenuItem value="Buzdolabı">Buzdolabı</MenuItem>
                  <MenuItem value="Kombi">Kombi</MenuItem>
                  <MenuItem value="Klima">Klima</MenuItem>
                  <MenuItem value="Elektrikli Süpürge">Elektrikli Süpürge</MenuItem>
                  <MenuItem value="Ocak">Ocak</MenuItem>
                  <MenuItem value="Fırın">Fırın</MenuItem>
                  <MenuItem value="Derin Dondurucu (Difriz)">Derin Dondurucu (Difriz)</MenuItem>
                  <MenuItem value="Hermetik Sofben">Hermetik Şofben</MenuItem>
                  <MenuItem value="Diğer">Diğer</MenuItem>
                </Select>
              </FormControl>
              <FormInput
                size="medium"
                type="number"
                label="Ücret"
                name="servicePrice"
                id="servicePrice"
                value={servicePrice}
                required
                onChange={(e) => setservicePrice(e.target.value)}
              />
              <ServiceTypeInput
                value={serviceType}
                onChange={(e) => setserviceType(e.target.value)}
              />
            </Stack>
            <Stack
              direction={{ xs: "col", sm: "row" }}
              justifyContent={"center"}
              spacing={3}
              gap={2}
              padding={1}
              marginTop={3}
            >
              <CustomButton
                fontSize="16px"
                width="200px"
                backgroundColor="#0c5834"
                type="submit"
              >
                Ekle
              </CustomButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  )
};

export default ServiceAdd;
