/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import axios from "axios";
import { formatDate } from "../../components/common/FormatDate";
import { formatPrice } from "../../components/common/FormatPrice";

const ArchivedServices = () => {
  const [nonFilterService, setNonFilterService] = useState([]);
  const [archivedServices, setArchivedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchArchivedServices = async () => {
    try {
      await axios.post(`http://89.116.52.58:3001/api/service/name`, { name: localStorage.getItem('name') }).then((res) => { setNonFilterService(res.data) });
      const filteredServices = nonFilterService.filter((service) => service.isArchived);
      const sortedServices = filteredServices.sort((a, b) => {
        const updatedAtA = new Date(a.updatedAt);
        const updatedAtB = new Date(b.updatedAt);

        if (updatedAtA > updatedAtB) {
          return -1;
        } else if (updatedAtA < updatedAtB) {
          return 1;
        } else {
          return 0;
        }
      });

      setArchivedServices(sortedServices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArchivedServices();
  }, [fetchArchivedServices()]);

  const handleSearch = async () => {
    if (searchTerm !== "") {
      try {
        const response = await axios.get("http://89.116.52.58:3001/api/service/");
        const filteredServices = response.data.filter(
          (service) =>
            service.isArchived &&
            service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setArchivedServices(filteredServices);
      } catch (error) {
        console.error(error);
      }
    } else {
      fetchArchivedServices();
    }
  };

  const handleChangeSearchTerm = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === "") {
      fetchArchivedServices();
    } else {
      handleSearch();
    }
  };

  return (
    <>
      <TextField
        sx={{ marginTop: '1rem' }}
        size="small"
        label="Arama"
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <TableContainer
        sx={{ height: "82vh", width: "100%", overflowX: "scroll", overflowY: "scroll" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Başlangıç/Bitiş Tarihi</TableCell>
              <TableCell>Telefon Numarası</TableCell>
              <TableCell>Adres</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell>Marka/Model</TableCell>
              <TableCell>Atölye/Servis</TableCell>
              <TableCell>Ücret</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivedServices.map((service) => (
              <TableRow key={service._id}>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell>
                  {formatDate(service.createdAt)}
                  <hr />
                  {formatDate(service.updatedAt)}
                </TableCell>
                <TableCell>{service.serviceGsmno}</TableCell>
                <TableCell>{service.serviceAddress}</TableCell>
                <TableCell>{service.serviceDesc}</TableCell>
                <TableCell>
                  {service.serviceBrand}
                  <hr />
                  {service.serviceModel}
                </TableCell>
                <TableCell>{service.serviceType}</TableCell>
                <TableCell>{formatPrice(service.servicePrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};

export default ArchivedServices;


