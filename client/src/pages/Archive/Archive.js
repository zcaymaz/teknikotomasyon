import React, { useState, useEffect } from "react";
import { TextField, Grid, Stack, Box, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDate } from "../../components/common/FormatDate";
import { formatPrice } from "../../components/common/FormatPrice";

const ArchivedServices = (props) => {
  const [archivedServices, setArchivedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchArchivedServices = async () => {
    try {
      const response = await axios.post("http://localhost/teknikoto/servicegetbyuserarchived.php", { username: localStorage.getItem('name') });
      const filteredServices = response.data.services;
      setArchivedServices(filteredServices.reverse());


      // let filteredBySearch = [...filteredServices];
      // if (searchTerm !== "") {
      //   filteredBySearch = filteredServices.filter((service) =>
      //     service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //     service.serviceGsmno.includes(searchTerm)
      //   );
      // }

      // if (addressFilter !== "") {
      //   filteredBySearch = filteredBySearch.filter((service) =>
      //     service.serviceAddress.toLowerCase().includes(addressFilter.toLowerCase())
      //   );
      // }

      // const startDateObject = startDate ? new Date(startDate) : null;
      // const endDateObject = endDate ? new Date(endDate) : null;

      // // Tarih filtresini uygulayın
      // const filteredByDate = filteredBySearch.filter((service) => {
      //   const matchesSearchTerm =
      //     searchTerm.trim() === "" ||
      //     service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //     service.serviceGsmno.includes(searchTerm);

      //   const createdAt = new Date(service.createdAt);

      //   // Başlangıç ve bitiş tarihlerini kontrol edin
      //   const startDateValid = !startDateObject || createdAt >= startDateObject;
      //   const endDateValid = !endDateObject || createdAt <= endDateObject;

      //   return matchesSearchTerm && startDateValid && endDateValid;
      // });

      // const sortedServices = filteredByDate.sort((a, b) => {
      //   const updatedAtA = new Date(a.updatedAt);
      //   const updatedAtB = new Date(b.updatedAt);

      //   if (updatedAtA > updatedAtB) {
      //     return -1;
      //   } else if (updatedAtA < updatedAtB) {
      //     return 1;
      //   } else {
      //     return 0;
      //   }
      // });

      // const servicesWithId = sortedServices.map((service) => ({
      //   ...service,
      //   id: service.id,
      // }));

      // setArchivedServices(servicesWithId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedServices();
  }, [searchTerm, startDate, endDate, addressFilter]);

  const columns = [
    { field: "servicename", headerName: "Ad Soyad", flex: 1 },
    {
      field: "dateRange",
      headerName: "Başlangıç/Bitiş Tarihi",
      flex: 1,
      renderCell: (params) => (
        <>
          {formatDate(params.row.createdAt)}
          <br />
          {formatDate(params.row.updatedAt)}
        </>
      ),
    },
    { field: "servicegsmno", headerName: "Telefon Numarası", flex: 1 },
    { field: "serviceaddress", headerName: "Adres", flex: 1 },
    { field: "servicedesc", headerName: "Açıklama", flex: 1 },
    {
      field: "serviceBrandAndModel",
      headerName: "Marka/Model",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.servicebrand}
          <hr />
          {params.row.servicemodel}
        </>
      ),
    },
    { field: "servicetype", headerName: "Atölye/Servis", flex: 1 },
    {
      field: "serviceprice",
      headerName: "Ücret",
      flex: 1,
      valueFormatter: (params) => formatPrice(params.value),
    },
    {
      field: "actions", // Düğme sütununun alan adı (herhangi bir isim kullanabilirsiniz)
      headerName: "İşlemler",
      flex: 0.6,
      renderCell: (params) => (
        <Button
          variant="outlined"
          className="archived-button"
          component={Link}
          to={`/update/${params.row.id}`}
        >
          Düzenle
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box spacing={2}>
        <Stack direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2} margin="2rem">
          <TextField
            size="small"
            fullWidth
            label="Ad Soyad / Telefon Ara"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <TextField
            size="small"
            fullWidth
            label="Adres Filtrele"
            value={addressFilter}
            onChange={(event) => setAddressFilter(event.target.value)}
          />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <TextField
              size="small"
              focused
              label="Başlangıç Tarihi"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
            <TextField
              size="small"
              focused
              label="Bitiş Tarihi"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Grid>
        </Stack>
      </Box>
      <div style={{ height: "82vh", width: "100%", overflow: "auto" }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '750px' }}>
            <CircularProgress />
          </div>
        ) : (
          <DataGrid
            rows={archivedServices}
            columns={columns}
            disableSelectionOnClick
            getRowId={(row) => row.id}
          />
        )}

      </div>
    </>
  );
};

export default ArchivedServices;

