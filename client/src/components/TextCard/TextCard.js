import React from "react";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

const TextCard = () => {
  return (
    <React.Fragment>
      <Grid p={1} sx={{bgcolor:'#dedede', minWidth:'275px'}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Müşteri İsmi
          </Typography>
          <Typography variant="h5" component="div">
            Müşteri Adres
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Müşteri Gsm
          </Typography>
          <Typography variant="body2">
            Açıklama
          </Typography>
          <Typography variant="body2">
            Marka
          </Typography>
          <Typography variant="body2">
            Ürün Modeli
          </Typography>
          <Typography variant="body2">
            Tarih
          </Typography>
          <Typography variant="body2">
            Ücret
          </Typography>
          <Typography variant="body2">
            Atölye mi Servis mi
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Grid>
    </React.Fragment>
  );
};

export default TextCard;
