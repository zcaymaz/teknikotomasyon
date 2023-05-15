import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import TextCard from "../../components/TextCard/TextCard";
import axios from "axios";

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/service/`);
        const filteredServices = response.data.filter(service => !service.isArchived);
        setServices(filteredServices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Grid container direction="row" justifyContent="center">
        <Typography pt={5} pb={1} sx={{ fontSize: "32px", color: "#0f0f0f" }}>
          Mevcut Servisler
        </Typography>
        <Divider sx={{ width: "100%", border: "1px solid #dedede" }} />
      </Grid>
      <Grid container direction="row" p={7} justifyContent="center" gap={3}>
        {services.map((service) => (
          <TextCard
            key={service._id}
            serviceDate={service.createdAt}
            serviceName={service.serviceName}
            serviceGsmno={service.serviceGsmno}
            serviceAddress={service.serviceAddress}
            serviceDesc={service.serviceDesc}
            serviceBrand={service.serviceBrand}
            serviceModel={service.serviceModel}
            serviceType={service.serviceType}
            servicePrice={service.servicePrice}
            onClick={() => {
              const confirmMessage = `Servisi tamamlamak istediğinizden emin misiniz?`;
              const result = window.confirm(confirmMessage);
            
              if (result) {
                axios.put(`http://localhost:3001/api/service/${service._id}`, {archived: true})
                  .then((res) => {
                    const fetchServices = async () => {
                      try {
                        const response = await axios.get(`http://localhost:3001/api/service/`);
                        const filteredServices = response.data.filter(service => !service.isArchived);
                        setServices(filteredServices);
                      } catch (error) {
                        console.error(error);
                      }
                    };
                    fetchServices();
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            }}
            
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;
