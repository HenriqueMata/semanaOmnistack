import React, { useState } from 'react';
import api from '../../services/api';
import logo from '../../assets/images/logo.svg';
import './Login.css';
export default function Login({ history }) {
    const [username, setUsername] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        await api.post('/devs', { username })
            .then(res => {
                if (res.status === 200) {
                    const { _id } = res.data;
                    setUsername('');
                    history.push(`/dev/${_id}`);
                }
            });


    }

    return (
        <div className="login-container">
            <form action="" onSubmit={handleSubmit}>
                <img src={logo} alt='Tindev' />
                <input
                    placeholder='Digite seu usuário no Github'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
}

