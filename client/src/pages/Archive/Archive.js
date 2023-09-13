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
  const [loading, setLoading] = useState(true);

  const fetchArchivedServices = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ENDPOINT_SERVICEGETBYUSERARCHIVED}`, { username: localStorage.getItem('name') });
      setArchivedServices(response.data.services.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedServices();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = archivedServices.filter((service) =>
    service.servicename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.servicegsmno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.serviceaddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.servicedesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "servicename", headerName: "Ad Soyad", flex: 1 },
    { field: "dateRange",
      headerName: "Başlangıç/Bitiş Tarihi",
      flex: 1,
      renderCell: (params) => (
        <>
          {formatDate(params.row.servicedate)}
          <br />
          {formatDate(params.row.completion_date)}
        </>
      ),
    },
    { field: "servicegsmno", headerName: "Telefon Numarası", flex: 1 },
    { field: "serviceaddress", headerName: "Adres", flex: 1 },
    { field: "servicedesc", headerName: "Açıklama", flex: 1 },
    { field: "serviceBrandAndModel",
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
      field: "actions",
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
            label="Ad Soyad / Telefon / Adres / Açıklama"
            value={searchTerm}
            onChange={handleSearch}
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
            rows={filteredServices}
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

