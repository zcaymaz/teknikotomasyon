import { Card, Grid, Stack, TextField, Typography, Button } from '@mui/material'



export const Login = () => {
    return (
        <Grid xs={12} container direction="column" sx={{ justifyContent: 'flex-end', alignItems: 'center', paddingTop: '7%' }} >
            <Card className="login-card" >
                <Stack xs={12} paddingTop={"10%"} className='login-stack' spacing={4}>
                    <Typography sx={{ color: 'black', textAlign: 'center', fontSize: '26px' }}>Üye Girişi</Typography>
                    <TextField id="outlined-basic" label="Kullanıcı Adı" variant="outlined"
                        sx={{ width: '30ch' }} />
                    <TextField id="outlined-basic" label="Parola" variant="outlined"
                        sx={{ width: '30ch' }} />
                    <Button variant="contained" sx={{ width: '90%', }}>Üye Girişi</Button>
                </Stack>
            </Card>
        </Grid>
    )
};
export default Login;