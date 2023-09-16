import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Button,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  FormInput,
  MultilineFormInput,
  SelectBrand,
  SelectModel,
  ServiceTypeInput,
} from "../../components/common/Inputs";
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
  const [loading, setLoading] = useState(true);

  const fetchService = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT_SERVICEGETBYID}`,
        { id: id }
      );
      const serviceData = response.data.data;
      setServiceName(serviceData.servicename);
      setServiceGsmno(serviceData.servicegsmno);
      setServiceAddress(serviceData.serviceaddress);
      setServiceDesc(serviceData.servicedesc);
      setServiceBrand(serviceData.servicebrand);
      setServiceModel(serviceData.servicemodel);
      setServiceType(serviceData.servicetype);
      setServicePrice(serviceData.serviceprice);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateService = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_ENDPOINT_SERVICEUPDATE}`, {
        servicename: serviceName,
        servicegsmno: serviceGsmno,
        serviceaddress: serviceAddress,
        servicedesc: serviceDesc,
        servicebrand: serviceBrand,
        servicemodel: serviceModel,
        servicetype: serviceType,
        serviceprice: servicePrice,
        id: id,
        username: localStorage.getItem("name"),
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
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "360px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <form onSubmit={updateService}>
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
            <center>
              <Button className="serviceadd-button" type="submit">
                Güncelle
              </Button>
            </center>
          </form>
        )}
      </Grid>
    </Grid>
  );
};

export default ServiceUpdate;
