import React, { useEffect, useState } from "react";
import { Grid, Stack, Button, Typography, Divider } from "@mui/material";
import { FormInput, MultilineFormInput, ServiceTypeInput } from "../../components/common/Inputs";
import axios from "axios";
import { useParams } from "react-router-dom";

const ServiceUpdate = () => {
  const { id } = useParams();
  const [serviceName, setServiceName] = useState("");
  const [serviceGsmno, setServiceGsmno] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceBrand, setServiceBrand] = useState("");
  const [serviceModel, setServiceModel] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const fetchService = async () => {
    try {
      const response = await axios.get(`http://89.116.52.58:3001/api/service/${id}`);
      const serviceData = response.data;
      setServiceName(serviceData.serviceName);
      setServiceGsmno(serviceData.serviceGsmno);
      setServiceAddress(serviceData.serviceAddress);
      setServiceDesc(serviceData.serviceDesc);
      setServiceBrand(serviceData.serviceBrand);
      setServiceModel(serviceData.serviceModel);
      setServiceType(serviceData.serviceType);
      setServicePrice(serviceData.servicePrice);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchService();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateService = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://89.116.52.58:3001/api/service/${id}`, {
        archived: false,
        serviceName,
        serviceGsmno,
        serviceAddress,
        serviceDesc,
        serviceBrand,
        serviceModel,
        serviceType,
        servicePrice,
      });

      resetForm();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setServiceName("");
    setServiceGsmno("");
    setServiceAddress("");
    setServiceDesc("");
    setServiceBrand("");
    setServiceModel("");
    setServiceType("");
    setServicePrice("");
  };

  return (
    <Grid container direction="row" p={3}>
      <Grid container direction="row" justifyContent="center" pb={2}>
        <Typography pt={2} pb={1} sx={{ fontSize: "32px", color: "#0f0f0f" }}>
          Servis Güncelle
        </Typography>
        <Divider sx={{ width: "100%", border: "1px solid #dedede" }} />
      </Grid>
      <Grid p={5} item xs={12} bgcolor="#f0f0f0">
        <form onSubmit={updateService}>
          <Stack direction={{xs:'col', sm:'row'}} spacing={3} gap={2} padding={1}>
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
          <Stack direction={{xs:'col', sm:'row'}} spacing={3} gap={2} padding={1}>
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
          <Stack direction={{xs:'col', sm:'row'}} spacing={3} gap={2} padding={1}>
            <FormInput size="medium" label="Ürün Markası" name="serviceBrand" id="serviceBrand" value={serviceBrand} required onChange={(e) => setServiceBrand(e.target.value)} /> 
            <FormInput size="medium" label="Ürün" name="serviceModel" id="serviceModel" value={serviceModel} required onChange={(e) => setServiceModel(e.target.value)} />
            <FormInput size="medium"  type="number"  label="Ücret"  name="servicePrice"  id="servicePrice"  value={servicePrice}  required  onChange={(e) => setServicePrice(e.target.value)}/>
            <ServiceTypeInput value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
          </Stack>
          <center>
            <Button className="serviceadd-button" type="submit">
              Güncelle
            </Button>
          </center>
        </form>
      </Grid>
    </Grid>
  );
};

export default ServiceUpdate;
