import axios from 'axios';
import React, { useState } from 'react';
import image from "../../images/bg-login.png"

export const Login = () => {
  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const loginSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/user/login', user);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    // <Grid container direction="row" sx={{ justifyContent: 'center', alignItems: 'center', paddingTop: '18vh', paddingBottom:'18vh' }} >
    //       <Card className="login-card" >
    //           <Stack paddingTop={"10%"} className='login-stack' spacing={4}>
    //               <form onSubmit={loginSubmit}>
    //               <Typography sx={{ color: 'black', textAlign: 'center', fontSize: '26px', padding:'1rem' }}>Üye Girişi</Typography>
    //               <TextField label="Kullanıcı Adı" variant="outlined" type="text" name="name" required onChange={onChangeInput} 
    //                   sx={{  width:'90%' }} />
    //               <TextField label="Parola" variant="outlined" type="password" name="password" required onChange={onChangeInput} 
    //                   sx={{ width: '90%', margin:'0.5rem' }} />
    //               <Button sx={styles.button} type='submit'>Giris Yap</Button>
    //               </form>
    //           </Stack>
    //       </Card>
    //   </Grid>
    <div class="container">
      <div class="login__content">
        <img src={image} alt="girisimage" class="login__img" />

        <form action="" onSubmit={loginSubmit} class="login__form">
          <div>
            <h1 class="login__title">
              <span>Hoşgeldiniz!</span>
            </h1>
            <p class="login__description">
              Lüften giriş yapıp devam ediniz.
            </p>
          </div>

          <div>
            <div class="login__inputs">
              <div>
                <label for="" class="login__label">Kullanıcı Adı</label>
                <input type="text" placeholder="Kullanıcı adınızı giriniz." name="name" required onChange={onChangeInput} className="login__input" />
              </div>

              <div>
                <label for="" class="login__label">Şifre</label>

                <div class="login__box">
                  <input type="password" placeholder="Şifrenizi giriniz." required name="password" onChange={onChangeInput} class="login__input" id="input-pass" />
                  <i class="ri-eye-off-line login__eye" id="input-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="login__buttons">
              <button type="submit" class="login__button">Giriş Yap</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};
export default Login;