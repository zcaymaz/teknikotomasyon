/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Box, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { formatPrice } from "./FormatPrice";
import { formatPhoneNumber } from "./FormatNumber";
import { formatDate } from "./FormatDate";
import { useReactToPrint } from "react-to-print";
import CustomButton from "./CustomButton";

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
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT_SERVICEGETBYID}`,
        { id: id }
      );
      const filteredServices = response.data.data;
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
      <CustomButton backgroundColor="teal" onClick={handleOpen}>
        Yazdır
      </CustomButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <table className="receipt-table" ref={componentRef}>
            <center>
              <Typography sx={{ padding: '1.2rem', fontSize: '14px', fontWeight: 'bold' }}>
                <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold',}}>{localStorage.getItem('businessname')}</Typography>
                <br />
                Fiş Tarihi: {service ? formatDate(service.creation_date) : null}
                <br />
                <br />
                Ad Soyad: {service?.servicename}
                <br />
                <br />
                Telefon No: {service ? formatPhoneNumber(service.servicegsmno) : null}
                <br />
                <br />
                Adres: {service?.serviceaddress}
                <br />
                <br />
                Açıklama: {service?.servicedesc}
                <br />
                <br />
                Ürün Marka: {service?.servicebrand}
                <br />
                <br />
                Ürün Model: {service?.servicemodel}
                <br />
                <br />
                Tutar: {service ? formatPrice(service.serviceprice) : null}
              </Typography>
            </center>
          </table>
          <center>
            <CustomButton backgroundColor="teal" onClick={handlePrint}>
              Yazdır
            </CustomButton>
          </center>
        </Box>
      </Modal>
    </>
  );
}