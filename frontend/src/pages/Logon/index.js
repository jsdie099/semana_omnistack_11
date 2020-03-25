import React,{useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';


export default function Logon(){
    const history = useHistory();
    const [id,setId] = useState('');
    async function handleSubmit(e)
    {
        e.preventDefault();
        try
        {
            const response = await api.post('/sessions',{id});
            //alert(response.data.name); 
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.name);
            history.push('/profile');
        }
        catch(e)
        {
            alert('Algo deu errado');
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <input type="text" placeholder="Sua ID" onChange={(e)=>setId(e.target.value)}/>
                    <button type="submit" className="button">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041"/> Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )    
}
