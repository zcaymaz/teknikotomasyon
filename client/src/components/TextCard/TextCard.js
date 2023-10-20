import React from "react";
import {
  CardContent,
  Typography,
  CardActions,
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
import { User, Phone, MapPin, Paperclip, ScanBarcode, Puzzle, ArrowRightLeft, Banknote } from "lucide-react";

const TextCard = (props) => {

  return (
    <React.Fragment>
      <Grid p={1} className="service-card">
        <CardHeader
          disableTypography
          sx={{ textAlign: "right", height: "0px", fontSize: "16px", marginRight: "1rem" }}
          title={"Tarih: " + formatDate(props.serviceDate)}
        />
        <CardContent>
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label"><User size={18} /> Ad Soyad: </span>
            <br />
            {props.serviceName}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label"><Phone size={18} /> Tel No: </span>
            <br />
            <a className="service-card-phone-number" href={`tel:${props.serviceGsmno}`}>{formatPhoneNumber(props.serviceGsmno)}</a>
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label"><MapPin size={18} /> Adres: </span>
            <br />
            {props.serviceAddress}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label"><Paperclip size={18} /> Açıklama: </span>
            <br />
            {props.serviceDesc}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label"><ScanBarcode size={18} /> Marka: </span>
            <br />
            {props.serviceBrand}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label"><Puzzle size={18} /> Ürün Modeli: </span>
            <br />
            {props.serviceModel}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label"><ArrowRightLeft size={18} /> Atölye/Servis: </span>
            <br />
            {props.serviceType}
          </Typography>
          <Divider />
          <Typography p={0.5} className="service-card-content">
            <span className="service-card-label"><Banknote size={18} /> Ücret: </span>
            <br />
            {formatPrice(props.servicePrice)}
          </Typography>
          <Divider />
        </CardContent>
        <CardActions sx={{ gap: '1.5rem', justifyContent: 'center' }}>
          <CustomButton onClick={props.onClick}>
            Tamamla
          </CustomButton>
          <CustomButton backgroundColor="#d1a507" component={Link} to={`/update/${props.serviceId}`}>
            Düzenle
          </CustomButton>
          <CustomButton backgroundColor="#ff0000" onClick={props.onClickDelete}>
            İptal
          </CustomButton>
        </CardActions>
        <CardActions className="print-button" sx={{ gap: '1.5rem', justifyContent: 'center' }}>
          <ServiceModal
            id={props.serviceId}
            serviceName={props.serviceName}
            serviceDate={formatDate(props.serviceDate)}
            serviceGsmno={props.serviceGsmno}
            serviceAddress={props.serviceAddress}
            serviceDesc={props.serviceDesc}
            serviceBrand={props.serviceBrand}
            serviceModel={props.serviceModel}
            servicePrice={formatPrice(props.servicePrice)}
          />
        </CardActions>
      </Grid>
    </React.Fragment>
  );
};

export default TextCard;
