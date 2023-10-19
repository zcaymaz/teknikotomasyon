import React, { useState, useEffect, useRef } from "react";
import { TextField, Grid, Stack, Box, Button, CircularProgress, Modal, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Visibility as VisibilityIcon, Clear as ClearIcon } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDate } from "../../components/common/FormatDate";
import { formatPrice } from "../../components/common/FormatPrice";
import { formatPhoneNumber } from "../../components/common/FormatNumber";
import CustomButton from "../../components/common/CustomButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "7px",
  boxShadow: 24,
  p: 1,
};

const ArchivedServices = (props) => {
  const [archivedServices, setArchivedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  const openModal = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setModalOpen(false);
  };

  const componentRef = useRef();

  const fetchArchivedServices = async () => {
    try {
      const response = await axios.post("http://89.116.52.58:3001/api/service/name", { name: localStorage.getItem('name') });
      const filteredServices = response.data.filter((service) => service.isArchived);

      let filteredBySearch = [...filteredServices];
      if (searchTerm !== "") {
        filteredBySearch = filteredServices.filter((service) =>
          service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.serviceGsmno.includes(searchTerm)
        );
      }

      if (addressFilter !== "") {
        filteredBySearch = filteredBySearch.filter((service) =>
          service.serviceAddress.toLowerCase().includes(addressFilter.toLowerCase())
        );
      }

      const startDateObject = startDate ? new Date(startDate) : null;
      const endDateObject = endDate ? new Date(endDate) : null;

      // Tarih filtresini uygulayın
      const filteredByDate = filteredBySearch.filter((service) => {
        const matchesSearchTerm =
          searchTerm.trim() === "" ||
          service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.serviceGsmno.includes(searchTerm);

        const createdAt = new Date(service.createdAt);

        // Başlangıç ve bitiş tarihlerini kontrol edin
        const startDateValid = !startDateObject || createdAt >= startDateObject;
        const endDateValid = !endDateObject || createdAt < new Date(endDateObject.getTime() + 86400000);;

        return matchesSearchTerm && startDateValid && endDateValid;
      });

      const sortedServices = filteredByDate.sort((a, b) => {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, startDate, endDate, addressFilter]);

  const columns = [
    {
      flex: 0.1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color: '#008000' }}
            component={Link}
            onClick={() => openModal(params.row)}
          >
            <VisibilityIcon />
          </Button>
        </Stack>
      ),
    },
    { field: "serviceName", headerName: "Ad Soyad", flex: 1 },
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
    {
      field: "actions",
      headerName: "İşlemler",
      flex: 0.8,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <CustomButton backgroundColor="#d1a507" component={Link} to={`/update/${params.row.id}`}>
            Düzenle
          </CustomButton>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <center>
        <Box spacing={2} sx={{ width: '97.5%', marginTop: {xs: '60px' , sm: '70px'}}}>
          <Grid
            container
            marginTop="1rem"
            marginBottom="1rem"
            sx={{ width: '95%' }}
            justifyContent="center"
            spacing={2}>
            <Grid item
              xs={6}>
              <TextField
                size="small"
                fullWidth
                label="Ad Soyad / Telefon Ara"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={6}>
              <TextField
                size="small"
                fullWidth
                label="Adres Filtrele"
                value={addressFilter}
                onChange={(event) => setAddressFilter(event.target.value)}
              />
            </Grid>
            <Grid
              item
              alignItems="center"
              md={4}
              xs={6}>
              <TextField
                size="small"
                fullWidth
                focused
                label="Başlangıç Tarihi"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </Grid>
            <Grid item
              alignItems="center"
              md={4}
              xs={6}>
              <TextField
                size="small"
                fullWidth
                focused
                label="Bitiş Tarihi"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        <div style={{ height: "80vh", width: "95%", overflow: "auto", borderRadius: '25px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '750px' }}>
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              sx={{ bgcolor: 'white', minWidth: '1280px' }}
              rows={archivedServices}
              columns={columns}
              disableSelectionOnClick
              getRowId={(row) => row._id}
            />
          )}
        </div>
        <br />

      </center>
      <Modal open={modalOpen} onClose={closeModal} sx={{ borderRadius: '20px' }}>
        <Box sx={style}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
            onClick={closeModal}
          >
            <ClearIcon />
          </IconButton>
          <table className="receipt-table" ref={componentRef}>
            <center>
              <Typography sx={{ padding: '1.2rem', fontSize: '14px', fontWeight: 'bold' }}>
                <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '2px', lineHeight: '10px' }}>{localStorage.getItem('name')}</Typography>
                BEYAZ EŞYA TEKNİK SERVİS
                <br />
                <br />
                {selectedRow && (
                  <>
                    Fiş Tarihi: {formatDate(selectedRow.createdAt)}
                    <br />
                    <br />
                    Ad Soyad: {selectedRow.serviceName}
                    <br />
                    <br />
                    Telefon No: {selectedRow ? formatPhoneNumber(selectedRow.serviceGsmno) : null}
                    <br />
                    <br />
                    Adres: {selectedRow.serviceAddress}
                    <br />
                    <br />
                    Açıklama: {selectedRow.serviceDesc}
                    <br />
                    <br />
                    Ürün Marka: {selectedRow.serviceBrand}
                    <br />
                    <br />
                    Ürün Model: {selectedRow.serviceModel}
                    <br />
                    <br />
                    Tutar: {selectedRow ? formatPrice(selectedRow.servicePrice) : null}
                  </>
                )}
              </Typography>
            </center>
          </table>
        </Box>
      </Modal>
    </>
  );
};

export default ArchivedServices;

