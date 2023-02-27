import React from 'react';
import styledComponents from 'styled-components';
import { BsKeyFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:5002' + '/users/login', { email: email, password: password })
            localStorage.setItem('jwt', data.jwt)
            NotificationManager.success('Successfully logged in', '', 3000)
            navigate('/')
        } catch (e) {
            NotificationManager.error('Email or password is incorrect', '', 3000)
        }
    }
    return (
        <Container onSubmit={handleSubmit}>
            {/* <img src="/logo.png" /> */}
            <h2>Нэвтрэх</h2>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="И-мэйл хаяг" name="email" />
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Нууц үг" name="password" />
            <button type="submit"><BsKeyFill />Нэвтрэх</button>
            <div className='or' style={{ marginTop: 5, marginBottom: 5, opacity: 0.7, fontSize: 10 }}>эсвэл</div>
            <button type="button" onClick={() => navigate('/register')}>Бүртгүүлэх</button>
            <div className='forgot_wrap' onClick={() => navigate('/forgot')}>Forgot password</div>
        </Container>
    );
};

export default Login;

const Container = styledComponents.form`
    display:flex;
    height:100vh;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:200px;
    margin:auto;
    img{
        width:100px;
    }
    .forgot_wrap{
        font-size:10px;
        text-align:center;
        margin-top:10px;
        color: ${({ theme }) => theme.lightblue};
        text-decoration:underline;
        cursor:pointer;
    }
    input[type="text"],input[type="password"]{
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 8px 12px;
        outline: none;
        transition: all 0.3s ease 0s;
        border-radius: 4px;
        box-sizing: border-box;
        text-overflow: ellipsis;
        margin-bottom:10px;
        width:100%;
        &:focus{
            border-color: rgba(0, 0, 0, 0.8);
            box-shadow: rgba(0 0 0 / 25%) 0px 0px 0px 2px;
        }
    }
    button{
        display:flex;
        align-items:center;
        justify-content:center;
        svg{
            font-size:16px;
            margin-right:5px;
        }
        text-transform:capitalize;
        padding:10px 16px;
        background:${({ theme }) => theme.color};
        color:white;
        border:none;
        border-radius:6px;
        font-weight:500;
        position:relative;
        overflow:hidden;
        cursor:pointer;
        width:100%;
    }
    button[type="button"]{
        background:${({ theme }) => theme.dark};
        margin-top:5px;
    }
`
