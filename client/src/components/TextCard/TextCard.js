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
import { Link } from "react-router-dom";
import ServiceModal from "../common/ServiceModal";
import { formatDate } from "../../components/common/FormatDate";
import { formatPhoneNumber } from "../../components/common/FormatNumber";
import { formatPrice } from "../../components/common/FormatPrice";
import CustomButton from "../common/CustomButton";

const TextCard = (props) => {

  return (
    <React.Fragment>
      <Grid p={1} className="service-card">       
        <CardHeader
          disableTypography
          sx={{ textAlign: "right", height: "0px", fontSize: "16px", marginRight:"1rem" }}
          title={"Tarih: " + formatDate(props.serviceDate)}
        />
        <CardContent>
          {props.key}
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Ad Soyad: </span>
            <br />
            {props.serviceName}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label">Tel No: </span>
            <br />
            {formatPhoneNumber(props.serviceGsmno)}
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
            {formatPrice(props.servicePrice)}
          </Typography>
          <Divider />
        </CardContent>
        <CardActions sx={{gap:'1.5rem', justifyContent:'center'}}>
          <CustomButton onClick={props.onClick}>
            Tamamla
          </CustomButton>
          <CustomButton backgroundColor="#d1a507" component={Link} to={`/update/${props.serviceId}`}>
            Düzenle
          </CustomButton>
          <CustomButton backgroundColor="#000" onClick={props.onClickDelete}>
            İptal
          </CustomButton>
        </CardActions>
        <CardActions className="print-button" sx={{gap:'1.5rem', justifyContent:'center'}}>
          {/* <ServiceModal id={props.serviceId}/> Konsolda ki id sorunu için */}
        </CardActions>
      </Grid>
    </React.Fragment>
  );
};

export default TextCard;
