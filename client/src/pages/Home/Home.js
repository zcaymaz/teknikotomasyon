/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, AppBar, Tabs, Tab, Box } from '@mui/material';
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
    const isLogged = localStorage.getItem('name') ? true : false
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [services, setServices] = useState([]);
    const [workshop, setWorkshop] = useState([]);

    const fetchServices = async () => {
        try {
            const res = await axios.post(`${apiBaseUrl}/api/service/name`, { name: localStorage.getItem('name') });
            const filteredServices = res.data.filter((service) => service.serviceType === "Servis" && !service.isArchived);
            setServices(filteredServices.reverse());
        } catch (error) {
            console.error(error);
        }
    };
    
    const fetchWorkshops = async () => {
        try {
            const res = await axios.post(`${apiBaseUrl}/api/service/name`, { name: localStorage.getItem('name') });
            const filteredWorkshops = res.data.filter((service) => service.serviceType === "Atölye" && !service.isArchived);
            setWorkshop(filteredWorkshops.reverse());
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchServices();
        fetchWorkshops();
    }, []);
    

    const handleCompleteService = (service) => {
        const confirmMessage = "Servisi tamamlamak istediğinizden emin misiniz?";
        const result = window.confirm(confirmMessage);

        if (result) {
            axios
                .put(`${apiBaseUrl}/api/service/${service._id}/archive`, { archived: true })
                .then(() => {
                    fetchServices();
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
    const LoggedRouter = () => {
        return (
            <>
              <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Servisler" {...a11yProps(0)} />
                    <Tab label="Atölye" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid container direction="row" justifyContent="center" gap={3}>
                        {services.map((service) => (
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
            </>
        )
      }
    const nonLoggedRouter = () => {
        return (
            <>
            <Grid container alignItems={'center'} sx={{ height: '70vh' }}>
                <Grid xs={12}>
                    <Typography variant='h2' className='animate-charcter'
                    sx={{ textAlign: 'center', width:'100%', height:'100%', fontWeight:'700', textTransform:'capitalize' }}>
                        Giriş Yapınız...
                    </Typography>
                </Grid>
            </Grid>
            </>
        )
      }
    return (
        <Box sx={{ bgcolor: 'background.paper', margin: '10px', border: '2px solid #dedede' }}>
            {isLogged ? LoggedRouter() : nonLoggedRouter()}
        </Box>
    );
}