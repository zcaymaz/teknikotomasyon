import React, { useState } from "react";
import { Grid, Stack, Button, Typography, Divider } from "@mui/material";
import { FormInput, MultilineFormInput, ServiceTypeInput } from "../../components/common/Inputs";
import axios from "axios";

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
      const token = localStorage.getItem("token"); // JWT token'ını buradan alın
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // JWT tokenini Authorization başlığına ekleyin
        },
      };
  
      await axios.post(
        "http://localhost/teknikoto/service.php",
        {
          servicename: serviceName,
          servicegsmno: serviceGsmno,
          serviceaddress: serviceAddress,
          servicedesc: serviceDesc,
          servicebrand: serviceBrand,
          servicemodel: serviceModel,
          servicetype: serviceType,
          serviceprice: servicePrice,
        },
        config // Config nesnesini isteğe ekleyin
      );
  
      // İşlemlerinizi burada tamamlayın
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  

  return (
    <>
      <Grid container direction="row" p={3}>
        <Grid container direction="row" justifyContent="center" pb={2}>
          <Typography pt={2} pb={1} sx={{ fontSize: "32px", color: "#0f0f0f" }}>
            Yeni Servis Ekle
          </Typography>
          <Divider sx={{ width: "100%", border: "1px solid #dedede" }} />
        </Grid>
        <Grid p={5} item xs={12} bgcolor="#f0f0f0">
          <form onSubmit={createService}>
            <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} gap={2} padding={1}>
              {/* Kullanıcı adı yerine JWT token'ı kullanılıyor */}
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
            <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} gap={2} padding={1}>
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
            <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} gap={2} padding={1}>
              <FormInput
                size="medium"
                label="Ürün Markası"
                name="serviceBrand"
                id="serviceBrand"
                value={serviceBrand}
                required
                onChange={(e) => setServiceBrand(e.target.value)}
              />
              <FormInput
                size="medium"
                label="Ürün"
                name="serviceModel"
                id="serviceModel"
                value={serviceModel}
                required
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
                Ekle
              </Button>
            </center>
          </form>
        </Grid>
      </Grid>
    </>
  )
};

export default ServiceAdd;
