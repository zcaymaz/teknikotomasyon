import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography, Divider, FormControl, TextField, Autocomplete } from "@mui/material";
import { FormInput, MultilineFormInput, ServiceTypeInput } from "../../components/common/Inputs";
import axios from "axios";
import CustomButton from "../../components/common/CustomButton";
import { useParams } from "react-router-dom";

const ServiceUpdate = () => {
  const apiBaseUrl = "http://89.116.52.58:3001";
  const { id } = useParams();
  const [serviceName, setServiceName] = useState("");
  const [serviceGsmno, setServiceGsmno] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceBrand, setServiceBrand] = useState("");
  const [serviceModel, setServiceModel] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [isArchived, setIsArchived] = useState("");

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
      setIsArchived(serviceData.isArchived);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateService = async (e, shouldComplete) => {
    e.preventDefault();
    try {
      if (shouldComplete && !window.confirm("Girmiş olduğunuz bilgileri onaylayıp, servisi arşive gönderme işlemini tamamlamak istediğinize emin misiniz?")) {
        return;
      }

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

      if (shouldComplete) {
        await handleCompleteService({ id });
      }

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

  const handleCompleteService = async () => {
    try {
      await axios.put(`${apiBaseUrl}/api/service/${id}/archive`, { archived: true });
    } catch (error) {
      console.error(error);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <Grid container direction="row" p={3}>
      <Grid container direction="row" justifyContent="center" pb={2}>
        <Typography pt={2} pb={1} sx={{ fontSize: "32px", color: "#0f0f0f", marginTop: '50px' }}>
          Servis Güncelle
        </Typography>
        <Divider sx={{ width: "100%", border: "1px solid #dedede" }} />
      </Grid>
      <Grid p={5} item xs={12} bgcolor="#f0f0f0">
        <form onSubmit={updateService}>
          <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} gap={2} padding={1}>
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
            <FormControl variant="outlined" size="medium" fullWidth>
              <Autocomplete
                id="serviceBrand"
                sx={{bgcolor: 'white'}}
                options={[
                  "Arçelik",
                  "Beko",
                  "Altus",
                  "Grundig",
                  "Bosch",
                  "Siemens",
                  "Profilo",
                  "Vestel",
                  "Regal",
                  "Finlüx",
                  "Ariston",
                  "İndesit",
                  "Electrolüx",
                  "Samsung",
                  "Baymak",
                  "Demirdöküm",
                  "Viessman",
                  "Ferroli",
                  "Buderus",
                  "Vaillant",
                  "Airfel",
                  "Protherm",
                ]}
                value={serviceBrand}
                onChange={(e, newValue) => setServiceBrand(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ürün Markası"
                    variant="outlined"
                    required
                  />
                )}
                freeSolo
                onInputChange={(e, newValue) => {
                  setServiceBrand(newValue);
                }}
              />
            </FormControl>

            <FormControl variant="outlined" size="medium" fullWidth>
              <Autocomplete
                id="serviceModel"
                sx={{bgcolor: 'white'}}
                options={[
                  "Çamaşır Makinesi",
                  "Bulaşık Makinesi",
                  "Buzdolabı",
                  "Kombi",
                  "Klima",
                  "Elektrikli Süpürge",
                  "Ocak",
                  "Fırın",
                  "Derin Dondurucu (Difriz)",
                  "Hermetik Şofben",
                  "Diğer",
                ]}
                value={serviceModel}
                onChange={(e, newValue) => setServiceModel(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ürün"
                    variant="outlined"
                    required
                  />
                )}
                freeSolo
                onInputChange={(e, newValue) => {
                  setServiceModel(newValue);
                }}
              />
            </FormControl>
            <FormInput size="medium" type="number" label="Ücret" name="servicePrice" id="servicePrice" value={servicePrice} required onChange={(e) => setServicePrice(e.target.value)} />
            <ServiceTypeInput value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
          </Stack>
          <Stack
            direction={{ xs: "col", sm: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={3}
            gap={2}
            padding={1}
            marginTop={3}
          >
            {isArchived === true
              ?
              null
              :
              (
                <CustomButton fontSize="16px" width="300px" type="submit" onClick={(e) => updateService(e, true)}>
                  Arşive Gönder
                </CustomButton>
              )
            }
            <CustomButton fontSize="16px" type="submit" width="300px" backgroundColor="#0c5834" onClick={(e) => updateService(e, false)}>
              Güncelle
            </CustomButton>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export default ServiceUpdate;
