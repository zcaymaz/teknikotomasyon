import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Stack,
  Box,
  Button,
  CircularProgress,
  Modal,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Visibility as VisibilityIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDate } from "../../components/common/FormatDate";
import { formatPrice } from "../../components/common/FormatPrice";
import { formatPhoneNumber } from "../../components/common/FormatNumber";

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
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT_SERVICEGETBYUSERARCHIVED}`,
        { username: localStorage.getItem("name") }
      );
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

  const filterByDate = (service, startDate, endDate) => {
    if (!startDate && !endDate) {
      return true; // Herhangi bir tarih filtresi uygulanmamışsa, her zaman true döndür
    }

    if (startDate && endDate) {
      // Başlangıç ve bitiş tarihleri belirtilmişse, bu aralıkta olanları filtrele
      const serviceDate = new Date(service.servicedate);
      const completionDate = new Date(service.completion_date);
      return (
        serviceDate >= new Date(startDate) &&
        completionDate <= new Date(endDate)
      );
    }

    if (startDate) {
      // Sadece başlangıç tarihi belirtilmişse, bu tarihten sonraki kayıtları filtrele
      const serviceDate = new Date(service.servicedate);
      return serviceDate >= new Date(startDate);
    }

    if (endDate) {
      // Sadece bitiş tarihi belirtilmişse, bu tarihten önceki kayıtları filtrele
      const completionDate = new Date(service.completion_date);
      return completionDate <= new Date(endDate);
    }
  };

  const filteredServices = archivedServices.filter(
    (service) =>
      service.servicename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.servicegsmno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceaddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.servicedesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startDateFilter = startDate.trim() === "" ? null : startDate;
  const endDateFilter = endDate.trim() === "" ? null : endDate;

  const filteredByDateServices = filteredServices.filter((service) =>
    filterByDate(service, startDateFilter, endDateFilter)
  );

  const columns = [
    {
      flex: 0.1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
              color: "#008000",
            }}
            component={Link}
            onClick={() => openModal(params.row)}
          >
            <VisibilityIcon />
          </Button>
        </Stack>
      ),
    },
    { field: "servicename", headerName: "Ad Soyad", flex: 1 },
    {
      field: "dateRange",
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
    // {
    //   field: "actions",
    //   headerName: "İşlemler",
    //   flex: 0.6,
    //   renderCell: (params) => (
    //     <Stack direction="row" spacing={1}>
    //       <CustomButton backgroundColor="#d1a507" component={Link} to={`/update/${params.row.id}`}>
    //         Düzenle
    //       </CustomButton>
    //     </Stack>
    //   ),
    // },
  ];

  return (
    <>
      <center>

          <Stack
            direction={{ xs: "col", sm: "row" }}
            justifyContent="flex-start"
            alignItems="center"
            spacing={3}
            gap={2}
            padding={2}
            bgcolor={"#fff"}
            margin={1}
            sx={{
              borderRadius: "25px",
            }}
          >
            <TextField
              size="small"
              fullWidth
              label="Ad Soyad / Telefon / Adres / Açıklama"
              value={searchTerm}
              onChange={handleSearch}
            />
            <TextField
              size="small"
              label="Başlangıç Tarihi"
              sx={{width:'240px'}}
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
            <TextField
              size="small"
              label="Bitiş Tarihi"
              sx={{width:'240px'}}
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Stack>

        <Stack
          direction={{ xs: "col", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={3}
          gap={2}
          bgcolor={"#fff"}
          margin={1}
          sx={{
            height: "80vh",
            overflow: "auto",
            borderRadius: "25px",
          }}
        >
          {loading ? (
              <CircularProgress />
          ) : (
            <DataGrid
              sx={{ bgcolor: "white", minWidth: "1280px" }}
              rows={filteredByDateServices}
              columns={columns}
              disableSelectionOnClick
              getRowId={(row) => row.id}
            />
          )}
        </Stack>
        <br />
      </center>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        sx={{ borderRadius: "20px" }}
      >
        <Box sx={style}>
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={closeModal}
          >
            <ClearIcon />
          </IconButton>
          <table className="receipt-table" ref={componentRef}>
            <center>
              <Typography
                sx={{ padding: "1.2rem", fontSize: "14px", fontWeight: "bold" }}
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {localStorage.getItem("businessname")}
                </Typography>
                <br />
                {selectedRow && (
                  <>
                    Fiş Tarihi: {formatDate(selectedRow.servicedate)}
                    <br />
                    <br />
                    Arşiv Tarihi: {formatDate(selectedRow.completion_date)}
                    <br />
                    <br />
                    Ad Soyad: {selectedRow.servicename}
                    <br />
                    <br />
                    Telefon No:{" "}
                    {selectedRow
                      ? formatPhoneNumber(selectedRow.servicegsmno)
                      : null}
                    <br />
                    <br />
                    Adres: {selectedRow.serviceaddress}
                    <br />
                    <br />
                    Açıklama: {selectedRow.servicedesc}
                    <br />
                    <br />
                    Ürün Marka: {selectedRow.servicebrand}
                    <br />
                    <br />
                    Ürün Model: {selectedRow.servicemodel}
                    <br />
                    <br />
                    Tutar:{" "}
                    {selectedRow ? formatPrice(selectedRow.serviceprice) : null}
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
