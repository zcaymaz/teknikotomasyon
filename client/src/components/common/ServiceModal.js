/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button, Box, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { formatPrice } from "./FormatPrice";
import { formatPhoneNumber } from "./FormatNumber";
import { formatDate } from "./FormatDate";
import { useReactToPrint } from "react-to-print";

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

export default function ServiceModal(props) {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [service, setService] = useState();

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `http://89.116.52.58:3001/api/service/${id}`
      );
      const filteredServices = response.data;
      setService(filteredServices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Button className="service-card-button-print" onClick={handleOpen}>
        Yazdır
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <table className="receipt-table" ref={componentRef}>
            <center>
              <Typography sx={{ padding: '1.2rem', fontSize: '14px', fontWeight: 'bold'}}>
                <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '2px', lineHeight: '10px' }}>{localStorage.getItem('name')}</Typography>
                BEYAZ EŞYA TEKNİK SERVİS
                <br />
                <br />
                Fiş Tarihi: {service ? formatDate(service.createdAt) : null}
                <br />
                <br />
                Ad Soyad: {service?.serviceName}
                <br />
                <br />
                Telefon No: {service ? formatPhoneNumber(service.serviceGsmno) : null}
                <br />
                <br />
                Adres: {service?.serviceAddress}
                <br />
                <br />
                Açıklama: {service?.serviceDesc}
                <br />
                <br />
                Ürün Marka: {service?.serviceBrand}
                <br />
                <br />
                Ürün Model: {service?.serviceModel}
                <br />
                <br />
                Tutar: {service ? formatPrice(service.servicePrice) : null}
              </Typography>
            </center>
          </table>
          <center>
            <Button className="receipt-print-button" onClick={handlePrint}>
              Yazdır
            </Button>
          </center>
        </Box>
      </Modal>
    </>
  );
}