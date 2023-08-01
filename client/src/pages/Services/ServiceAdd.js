import React, { useState } from "react";
import { Grid, Stack, Button, Typography, Divider } from "@mui/material";
import { FormInput, MultilineFormInput, ServiceTypeInput } from "../../components/common/Inputs";
import axios from "axios";

const ServiceAdd = () => {
  const isLogged = localStorage.getItem('name') ? true : false

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
  const LoggedRouter = () => {
    return (
        <>
<Grid container direction="row" p={3}>
        <Grid container direction="row" justifyContent="center" pb={2}>
          <Typography pt={2} pb={1} sx={{ fontSize: "32px", color: "#0f0f0f" }}>
            Servis Ekle
          </Typography>
          <Divider sx={{ width: "100%", border: "1px solid #dedede" }} />
        </Grid>
        <Grid p={5} item xs={12} bgcolor="#f0f0f0">
          <form onSubmit={createService}>
            <Stack direction={{xs:'col', sm:'row'}} spacing={3} gap={2} padding={1}>
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
            <Stack direction={{xs:'col', sm:'row'}} spacing={3} gap={2} padding={1}>
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
            <Stack direction={{xs:'col', sm:'row'}} spacing={3} gap={2}padding={1}>
              <FormInput
                size="medium"
                label="Ürün Markası"
                name="serviceBrand"
                id="serviceBrand"
                value={serviceBrand}
                required
                onChange={(e) => setserviceBrand(e.target.value)}
              />
              <FormInput
                size="medium"
                label="Ürün"
                name="serviceModel"
                id="serviceModel"
                value={serviceModel}
                required
                onChange={(e) => setserviceModel(e.target.value)}
              />
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
            <center>
              <Button className="serviceadd-button" type="submit">
                Ekle
              </Button>
            </center>
          </form>
        </Grid>
      </Grid>
        </>
    )
  }
  const nonLoggedRouter = () => {
    return (
        <>
            <Grid container alignItems={'center'} sx={{ height: '70vh' }}>
                <Grid xs={12}>
                    <Typography variant='h2' className='animate-charcter'
                    sx={{ textAlign: 'center', width:'100%', height:'100%', fontWeight:'700', textTransform:'capitalize' }}>
                        Giriş Yapınız...
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
  }
  return (
    <>
      {isLogged ? LoggedRouter() : nonLoggedRouter()}
    </>
  );
};

export default ServiceAdd;
