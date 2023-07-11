/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button, Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { formatPrice } from "./FormatPrice";
import { formatPhoneNumber } from "./FormatNumber";
import { useReactToPrint } from "react-to-print";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius:"7px",
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
            <tr>
              <th className="receipt-left-side">Ad Soyad: </th>
              <th className="receipt-right-side">{service?.serviceName}</th>
            </tr>
            <tr>
              <th className="receipt-left-side">Telefon No: </th>
              <th className="receipt-right-side">{service ? formatPhoneNumber(service.serviceGsmno) : null}</th>
            </tr>
            <tr>
              <th className="receipt-left-side">Adres: </th>
              <th className="receipt-right-side">{service?.serviceAddress}</th>
            </tr>
            <tr>
              <th className="receipt-left-side">Açıklama: </th>
              <th className="receipt-right-side">{service?.serviceDesc}</th>
            </tr>
            <tr>
              <th className="receipt-left-side">Ürün Marka: </th>
              <th className="receipt-right-side">{service?.serviceBrand}</th>
            </tr>
            <tr>
              <th className="receipt-left-side">Ürün Model: </th>
              <th className="receipt-right-side">{service?.serviceModel}</th>
            </tr>
            <tr>
              <th className="receipt-left-side">Servis Ücreti: </th>
              <th className="receipt-right-side">{service ? formatPrice(service.servicePrice) : null}</th>
            </tr>
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
