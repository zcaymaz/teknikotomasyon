import React, { useRef, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
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
  const {
    serviceName,
    serviceDate,
    serviceGsmno,
    serviceAddress,
    serviceDesc,
    serviceBrand,
    serviceModel,
    servicePrice,
  } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                  {localStorage.getItem('businessname')}
                </Typography>
                <br />
                Fiş Tarihi: {serviceDate}
                <br />
                <br />
                Ad Soyad: {serviceName}
                <br />
                <br />
                Telefon No: {serviceGsmno}
                <br />
                <br />
                Adres: {serviceAddress}
                <br />
                <br />
                Açıklama: {serviceDesc}
                <br />
                <br />
                Ürün Marka: {serviceBrand}
                <br />
                <br />
                Ürün Model: {serviceModel}
                <br />
                <br />
                Tutar: {servicePrice}
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
