import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [user] = useState({
        name: '', password: '',
    })

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('http://89.116.52.58:3001/user/register', { ...user }).then((res) => {
                window.location.href = "/";
            })
            const userParams = ['name'];
            const userValues = [user.name];

            for (let i = 0; i < userParams.length; i++) {
                localStorage.setItem(userParams[i], userValues[i]);
            }

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="m-5 text-center">
            <h2 className='authentication-h2'>Kayıt Ol</h2>
            <form className='authentication-form' onSubmit={registerSubmit}>
                <p>
                    <label className='authentication-label'>İşletme Adı</label><br />
                    <input className='authentication-input' type="text" value={user.name} name="name" required />
                </p>
                <p>
                    <label className='authentication-label'>Şifre</label><br />
                    <input className='authentication-input' type="password" value={user.password} name="password" required />
                </p>
                <p>
                    <button className='authentication-button' id="sub_btn" type="submit" >Kayıt Ol</button>
                </p>
            </form>
        </div>
    )
}

export default Register