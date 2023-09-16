import React, { useState } from "react";
import { Grid, Stack, Typography, Divider } from "@mui/material";
import {
  FormInput,
  MultilineFormInput,
  ServiceTypeInput,
  SelectBrand,
  SelectModel,
} from "../../components/common/Inputs";
import axios from "axios";
import CustomButton from "../../components/common/CustomButton";

const ServiceAdd = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceGsmno, setServiceGsmno] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceBrand, setServiceBrand] = useState("");
  const [serviceModel, setServiceModel] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const createService = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_ENDPOINT_SERVICEADD}`, {
        servicename: serviceName,
        servicegsmno: serviceGsmno,
        serviceaddress: serviceAddress,
        servicedesc: serviceDesc,
        servicebrand: serviceBrand,
        servicemodel: serviceModel,
        servicetype: serviceType,
        serviceprice: servicePrice,
        username: localStorage.getItem("name"),
      });
      setServiceName("");
      setServiceGsmno("");
      setServiceAddress("");
      setServiceDesc("");
      setServiceBrand("");
      setServiceModel("");
      setServiceType("");
      setServicePrice("");
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <Grid container direction="row" p={3}>
        <Grid container direction="row" justifyContent="center" pb={2}>
          <Typography pt={2} pb={1} sx={{ fontSize: "32px", color: "#475467" }}>
            Yeni Servis Ekle
          </Typography>
          <Divider sx={{ width: "100%", border: "1px solid #F2F4F7" }} />
        </Grid>
        <Grid p={5} item xs={12} bgcolor="#F2F4F7" borderRadius="12px">
          <form onSubmit={createService}>
            <Stack
              direction={{ xs: "col", sm: "row" }}
              spacing={3}
              gap={2}
              padding={1}
            >
              <FormInput
                size="medium"
                label="Müşteri İsmi"
                name="serviceName"
                id="serviceName"
                value={serviceName}
                required
                onChange={(e) => setServiceName(e.target.value)}
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
                    setServiceGsmno(e.target.value);
                  }
                }}
              />
            </Stack>
            <Stack
              direction={{ xs: "col", sm: "row" }}
              spacing={3}
              gap={2}
              padding={1}
            >
              <MultilineFormInput
                label="Açıklama"
                name="serviceDesc"
                id="serviceDesc"
                value={serviceDesc}
                required
                onChange={(e) => setServiceDesc(e.target.value)}
              />
              <MultilineFormInput
                label="Adres"
                name="serviceAddress"
                id="serviceAddress"
                value={serviceAddress}
                required
                onChange={(e) => setServiceAddress(e.target.value)}
              />
            </Stack>
            <Stack
              direction={{ xs: "col", sm: "row" }}
              spacing={3}
              gap={2}
              padding={1}
            >
              <SelectBrand
                value={serviceBrand}
                onChange={(e) => setServiceBrand(e.target.value)}
              />
              <SelectModel
                value={serviceModel}
                onChange={(e) => setServiceModel(e.target.value)}
              />
              <FormInput
                size="medium"
                type="number"
                label="Ücret"
                name="servicePrice"
                id="servicePrice"
                value={servicePrice}
                required
                onChange={(e) => setServicePrice(e.target.value)}
              />
              <ServiceTypeInput
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
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
                type="submit"
                width="200px"
                backgroundColor="#0c5834"
              >
                Ekle
              </CustomButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default ServiceAdd;
