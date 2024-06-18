import React, { useState } from 'react';
import "../style/divLog.css"
function DivLog({isLogin}) {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        const loginData = {
            userName,
            password,
        };

        const url = isLogin ? 'http://localhost:3000/admin/autentification' : 'http://localhost:3000/admin/register'

        await fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if(isLogin) {
                    const {token, userId, role} = data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('role', role);

                    if (role === 'Med') {
                        // Envoyer l'interface en fonction
                    } else if (role === 'Ad') {
                        // Envoyer l'interface correspondante
                    } else if (role === 'Inf') {
                        // Pareil
                    } else {
                        alert('Erreur : mauvais rôle reçu');
                    }
                }else{
                    alert('compte créer.')
                }
            })
            .catch(error => {
                alert('Erreur de connexion : ' + error.message);
                console.log(error);
            });
    };

    return (
        <div className="div-log">
            <form className="login-form" onSubmit={handleLogin}>
                <div className="login__form">
                    <label htmlFor="user_name">Nom d'utilisateur</label>
                    <input
                        id="user_name"
                        name="user_name"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="login__form">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </form>
            <div className="sub__button">
                <button className="submit-button" type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </div>

        </div>
    );
}

export default DivLog;
