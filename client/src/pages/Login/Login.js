import axios from 'axios';
import React, { useState } from 'react';
import image from "../../images/bg-login.png"

export const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ENDPOINT_LOGIN}`,
        user,
      );
      if (res.status === 200 && res.data.success) {
        localStorage.setItem('name', res.data.username);
        localStorage.setItem('businessname', res.data.businessname);
        window.location.href = '/';
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="login__content">
        <img src={image} alt="girisimage" className="login__img" />

        <form action="" onSubmit={loginSubmit} className="login__form">
          <div>
            <h1 className="login__title">
              <span>Hoşgeldiniz!</span>
            </h1>
            <p className="login__description">
              Lüften giriş yapıp devam ediniz.
            </p>
          </div>

          <div>
            <div className="login__inputs">
              <div>
                <label className="login__label">Kullanıcı Adı</label>
                <input type="text" placeholder="Kullanıcı adınızı giriniz." name="username" required onChange={onChangeInput} className="login__input" />
              </div>

              <div>
                <label className="login__label">Şifre</label>

                <div className="login__box">
                  <input type="password" placeholder="Şifrenizi giriniz." required name="password" onChange={onChangeInput} className="login__input" id="input-pass" />
                  <i className="ri-eye-off-line login__eye" id="input-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="login__buttons">
              <button type="submit" className="login__button">Giriş Yap</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};
export default Login;