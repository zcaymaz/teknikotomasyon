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
    const apiBaseUrl = "http://89.116.52.58:3001";
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [services, setServices] = useState([]);
    const [workshop, setWorkshop] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const res = await axios.post("http://localhost/teknikoto/servicegetbyuser.php", { username: localStorage.getItem('name') });
            const filteredServices = res.data.services.filter((service) => service.serviceType === "Servis" && !service.isArchived);
            setServices(filteredServices.reverse());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWorkshops = async () => {
        try {
            const res = await axios.post(`${apiBaseUrl}/api/service/name`, { name: localStorage.getItem('name') });
            const filteredWorkshops = res.data.filter((service) => service.serviceType === "Atölye" && !service.isArchived);
            setWorkshop(filteredWorkshops.reverse());
            // setWorkshop(res.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchWorkshops();
    }, []);

    console.log(fetchServices());
    const handleCompleteService = (service) => {
        const confirmMessage = "Servisi tamamlamak istediğinizden emin misiniz?";
        const result = window.confirm(confirmMessage);

        if (result) {
            axios
                .put(`${apiBaseUrl}/api/service/${service._id}/archive`, { archived: true })
                .then(() => {
                    fetchServices();
                    fetchWorkshops();
                })
                .catch((error) => {
                    console.error(error);
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
                                        />
                                    ))}
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <Grid container direction="row" justifyContent="center" gap={3}>
                                    {workshop.map((service) => (
                                        <TextCard
                                            serviceId={service._id}
                                            serviceDate={service.createdAt}
                                            serviceName={service.serviceName}
                                            serviceGsmno={service.serviceGsmno}
                                            serviceAddress={service.serviceAddress}
                                            serviceDesc={service.serviceDesc}
                                            serviceBrand={service.serviceBrand}
                                            serviceModel={service.serviceModel}
                                            serviceType={service.serviceType}
                                            servicePrice={service.servicePrice}
                                            onClick={() => handleCompleteService(service)}
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