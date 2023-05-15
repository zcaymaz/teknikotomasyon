import React from "react";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  CardHeader,
  Divider,
} from "@mui/material";

const TextCard = (props) => {
  return (
    <React.Fragment>
      <Grid p={1} className="service-card">
        <CardHeader
          disableTypography
          sx={{ textAlign: "right", height: "0px", fontSize: "16px" }}
          title={"Tarih: " + props.serviceDate}
        />
        <CardContent>
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Ad Soyad: </span>
            <br />
            {props.serviceName}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Tel No: </span>
            <br />
            {props.serviceGsmno}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Adres: </span>
            <br />
            {props.serviceAddress}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Açıklama: </span>
            <br />
            {props.serviceDesc}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Marka: </span>
            <br />
            {props.serviceBrand}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Ürün Modeli: </span>
            <br />
            {props.serviceModel}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Atölye/Servis: </span>
            <br />
            {props.serviceType}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Ücret: </span>
            <br />
            {props.servicePrice}
          </Typography>
          <Divider />
        </CardContent>
        <CardActions>
          <Button size="small" className="service-card-button">Tamamla</Button>
        </CardActions>
      </Grid>
    </React.Fragment>
  );
};

export default TextCard;
