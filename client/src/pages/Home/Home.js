import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import TextCard from "../../components/TextCard/TextCard";

const Home = () => {
  return (
    <>
      <Grid container direction="row" justifyContent="center" bgcolor="">
        <Typography pt={5} pb={1} sx={{fontSize:'32px', color:'#0f0f0f'}}>Mevcut Servisler</Typography>
        <Divider sx={{width:'100%', border:'1px solid #dedede'}}/>
      </Grid>
      <Grid container direction="row" p={7}>
        <TextCard />
      </Grid>
    </>
  );
};

export default Home;
