import React, { useState } from 'react';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('admin@test.test');
    const [password, setPassword] = useState('secretpass1');
    const [section, setSection] = useState('section');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:4000/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Acess-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                username: email, 
                password: password 
            })
        });
        const data = await response.json();

        setSection(data.id);

        Cookies.set('metabase.SESSION', data.id, { expires: 1 });
    };

    return (
        <div>
            <h1>Login</h1>
            <h2>Sec {section}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => {
                Cookies.remove('metabase.SESSION');
                setSection('');
            }}>Exit</button>
        </div>
    );
};

export default Login;
