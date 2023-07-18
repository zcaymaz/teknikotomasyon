import React, { useState, useEffect } from "react";
import {
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { formatDate } from "../../components/common/FormatDate";
import { formatPrice } from "../../components/common/FormatPrice";

const ArchivedServices = () => {
  const [archivedServices, setArchivedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchArchivedServices = async () => {
    try {
      const response = await axios.get("http://89.116.52.58:3001/api/service/");
      const filteredServices = response.data.filter((service) => service.isArchived);
  
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
  
      const servicesWithId = sortedServices.map((service) => ({
        ...service,
        id: service._id,
      }));
  
      setArchivedServices(servicesWithId);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchArchivedServices();
  }, []);

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

  const columns = [
    { field: "serviceName", headerName: "Ad Soyad" },
    {
      field: "dateRange",
      headerName: "Başlangıç/Bitiş Tarihi",
      flex: 1,
      renderCell: (params) => (
        <>
          {formatDate(params.row.createdAt)}
          <hr />
          {formatDate(params.row.updatedAt)}
        </>
      ),
    },
    { field: "serviceGsmno", headerName: "Telefon Numarası", flex: 1 },
    { field: "serviceAddress", headerName: "Adres", flex: 1 },
    { field: "serviceDesc", headerName: "Açıklama", flex: 1 },
    {
      field: "serviceBrandAndModel",
      headerName: "Marka/Model",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.serviceBrand}
          <hr />
          {params.row.serviceModel}
        </>
      ),
    },
    { field: "serviceType", headerName: "Atölye/Servis", flex: 1 },
    {
      field: "servicePrice",
      headerName: "Ücret",
      flex: 1,
      valueFormatter: (params) => formatPrice(params.value),
    },
  ];

  return (
    <>
      <TextField
        sx={{ marginTop: "1rem" }}
        size="small"
        label="Arama"
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <div style={{ height: "82vh", width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={archivedServices}
          columns={columns}
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default ArchivedServices;
