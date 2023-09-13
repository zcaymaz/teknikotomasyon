import React, { useState, useEffect } from "react";
import { TextField, Grid, Stack, Box, Button, CircularProgress, Modal, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Visibility as VisibilityIcon, Clear as ClearIcon } from "@mui/icons-material"; // Göz simgesi ekledik
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
  const [selectedRow, setSelectedRow] = useState(null); // Seçilen satır bilgisini saklayacak state
  const [modalOpen, setModalOpen] = useState(false);


  // Modalı açma işlemi
  const openModal = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  // Modalı kapatma işlemi
  const closeModal = () => {
    setSelectedRow(null);
    setModalOpen(false);
  };

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
      flex: 0.6,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            className="archived-button"
            component={Link}
            to={`/update/${params.row.id}`}
          >
            Düzenle
          </Button>
        </Stack>
      ),
    },
  ];
  
  return (
    <>
      <center>
        <Box spacing={2} sx={{ width: '97.5%' }}>
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

        <div style={{ height: "80vh", width: "95%", overflow: "auto", borderRadius: '30px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '750px' }}>
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              sx={{ bgcolor: 'white' }}
              rows={archivedServices}
              columns={columns}
              disableSelectionOnClick
              getRowId={(row) => row._id}
            />
          )}
        </div>
        <br />

      </center>

      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
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
          {selectedRow && (
            <>
              <p>Ad-Soyad:{selectedRow.serviceName}</p>
              <p>Başlangıç Tarihi: {formatDate(selectedRow.createdAt)}</p>
              <p>Bitiş Tarihi: {formatDate(selectedRow.updatedAt)}</p>
              <p>Telefon Numarası: {selectedRow.serviceGsmno}</p>
              <p>Adres: {selectedRow.serviceAddress}</p>
              <p>Açıklama: {selectedRow.serviceDesc}</p>
              <p>Marka-Model: {selectedRow.serviceBrand}{selectedRow.serviceModel}</p>
              <p>Marka-Model: {selectedRow.serviceType}</p>
              <p>Marka-Model: {selectedRow.servicePrice}</p>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ArchivedServices;

