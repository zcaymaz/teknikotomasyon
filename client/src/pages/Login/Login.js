import { Card, Grid, Stack, TextField, Typography, Button } from '@mui/material'
import axios from 'axios';
import React, {useState} from 'react';


export const Login = () => {
    const [user, setUser] = useState({
        name: '',
        password: '',
      });
    
    const styles = {
      button: {
        bgcolor: '#12b40c',
        color: '#fff',
        marginTop: '1.5rem',
        width: '50%',
        '&:hover': {
          bgcolor: '#12b40c', // İstenilen renk buraya yazılabilir veya silinebilir
        },
      },
    };
    const onChangeInput = e => {
      const { name, value } = e.target;
      setUser(prevState => ({ ...prevState, [name]: value }));
    };
  
    const loginSubmit = async e => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:3001/user/login', user);
        localStorage.setItem('name', res.data.name);
        window.location.href = '/';
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    return (
        <Grid container direction="row" sx={{ justifyContent: 'center', alignItems: 'center', paddingTop: '18vh', paddingBottom:'18vh' }} >
            <Card className="login-card" >
                <Stack paddingTop={"10%"} className='login-stack' spacing={4}>
                    <form onSubmit={loginSubmit}>
                    <Typography sx={{ color: 'black', textAlign: 'center', fontSize: '26px', padding:'1rem' }}>Üye Girişi</Typography>
                    <TextField label="Kullanıcı Adı" variant="outlined" type="text" name="name" required onChange={onChangeInput} 
                        sx={{  width:'90%' }} />
                    <TextField label="Parola" variant="outlined" type="password" name="password" required onChange={onChangeInput} 
                        sx={{ width: '90%', margin:'0.5rem' }} />
                    <Button sx={styles.button} type='submit'>Giris Yap</Button>
                    </form>
                </Stack>
            </Card>
        </Grid>
    )
};
export default Login;