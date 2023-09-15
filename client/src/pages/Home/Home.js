/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, AppBar, Tabs, Tab, Box, Container, Paper, CircularProgress } from '@mui/material';
import TextCard from "../../components/TextCard/TextCard";
import axios from "axios";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [services, setServices] = useState([]);
    const [workshop, setWorkshop] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_ENDPOINT_SERVICEGETBYUSER}`, { username: localStorage.getItem('name') });
            const allServices = res.data.services;
    
            const filteredServices = allServices.filter((service) => service.servicetype === "Servis");
            const filteredWorkshops = allServices.filter((service) => service.servicetype === "Atölye");
    
            setServices(filteredServices.reverse());
            setWorkshop(filteredWorkshops.reverse());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchServices();
    }, []);
    
    
    const handleCompleteService = (service) => {
        const confirmMessage = "Servisi tamamlamak istediğinizden emin misiniz?";
        const result = window.confirm(confirmMessage);

        if (result) {
            setLoading(true);

            axios
                .post(`${process.env.REACT_APP_ENDPOINT_SERVICECOMPLETED}`, { id: service.id } )
                .then(() => {
                    fetchServices();
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleDeleteService = (service) => {
        const confirmMessage = "Servisi iptal etmek istediğinizden emin misiniz?";
        const result = window.confirm(confirmMessage);
    
        if (result) {
            setLoading(true);
    
            axios
                .delete(`${process.env.REACT_APP_ENDPOINT_SERVICEDELETE}`, { data: { id: service.id } })
                .then(() => {
                    fetchServices();
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <>
            <br />
            <Container maxWidth="none">
                <AppBar  sx={{ bgcolor: '#0c5834', borderRadius: '30px 30px 0px 0px'}} position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        sx={{
                            "& button.Mui-selected": {backgroundColor: 'inherit'}
                        }}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#f7f4ed",
                                height: 4,
                            }
                        }}
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Servisler" {...a11yProps(0)} />
                        <Tab label="Atölye" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <Paper elevation={3} sx={{ borderRadius: "0px", marginBottom: "20px"}}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '750px' }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <Grid container direction="row" justifyContent="center" gap={3}>
                                    {services.map((service) => (
                                        <TextCard
                                            serviceId={service.id}
                                            serviceDate={service.creation_date}
                                            serviceName={service.servicename}
                                            serviceGsmno={service.servicegsmno}
                                            serviceAddress={service.serviceaddress}
                                            serviceDesc={service.servicedesc}
                                            serviceBrand={service.servicebrand}
                                            serviceModel={service.servicemodel}
                                            serviceType={service.servicetype}
                                            servicePrice={service.serviceprice}
                                            onClick={() => handleCompleteService(service)}
                                            onClickDelete={() => handleDeleteService(service)}
                                        />
                                    ))}
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <Grid container direction="row" justifyContent="center" gap={3}>
                                    {workshop.map((service) => (
                                        <TextCard
                                            serviceId={service.id}
                                            serviceDate={service.creation_date}
                                            serviceName={service.servicename}
                                            serviceGsmno={service.servicegsmno}
                                            serviceAddress={service.serviceaddress}
                                            serviceDesc={service.servicedesc}
                                            serviceBrand={service.servicebrand}
                                            serviceModel={service.servicemodel}
                                            serviceType={service.servicetype}
                                            servicePrice={service.serviceprice}
                                            onClick={() => handleCompleteService(service)}
                                            onClickDelete={() => handleDeleteService(service)}
                                        />
                                    ))}
                                </Grid>
                            </TabPanel>
                        </SwipeableViews>
                    )}
                </Paper>
            </Container >
        </>
    )
};