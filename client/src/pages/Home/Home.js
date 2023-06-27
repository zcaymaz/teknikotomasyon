import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import TextCard from "../../components/TextCard/TextCard";
import axios from "axios";
import { formatDate } from "../../components/common/FormatDate";
import { formatPrice } from "../../components/common/FormatPrice";
import { formatPhoneNumber } from "../../components/common/FormatNumber";

const Home = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://89.116.52.58:3001/api/service/");
      const filteredServices = response.data.filter((service) => !service.isArchived);
      const reversedServices = filteredServices.reverse();
      setServices(reversedServices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCompleteService = (service) => {
    const confirmMessage = "Servisi tamamlamak istediğinizden emin misiniz?";
    const result = window.confirm(confirmMessage);

    if (result) {
      axios
        .put(`http://89.116.52.58:3001/api/service/${service._id}/archive`, { archived: true })
        .then(() => {
          fetchServices();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Grid container direction="row" justifyContent="center" mb={2}>
        <Typography pt={5} pb={1} sx={{ fontSize: "32px", color: "#0f0f0f" }}>
          Mevcut Servisler
        </Typography>
        <Divider sx={{ width: "100%", border: "1px solid #dedede" }} />
      </Grid>
      <Grid container direction="row" p={{ xs: 0, sm: 7 }} justifyContent="center" gap={3}>
        {services.map((service) => (
          <TextCard
            key={service._id}
            serviceId={service._id}
            serviceDate={formatDate(service.createdAt)}
            serviceName={service.serviceName}
            serviceGsmno={formatPhoneNumber(service.serviceGsmno)}
            serviceAddress={service.serviceAddress}
            serviceDesc={service.serviceDesc}
            serviceBrand={service.serviceBrand}
            serviceModel={service.serviceModel}
            serviceType={service.serviceType}
            servicePrice={formatPrice(service.servicePrice)}
            onClick={() => handleCompleteService(service)}
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;
