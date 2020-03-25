import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';    


export default function NewIncident()
{
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    
    async function handleSubmit(e)
    {
        const data = {
            title,
            description,
            value
        };
        e.preventDefault();
        try
        {
            await api.post('/incidents', data,{
                headers : {
                    Authorization: ongId
                }
            });
            history.push('/profile');
        }
        catch(e)
        {
            console.log(e);
            alert('Algo deu errado no cadastro!');
        }
    }
    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>
                    Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                </p>
                <Link to="/profile" className="back-link">
                    <FiArrowLeft size={16} color="#E02041"/> Voltar para home
                </Link>
            </section>
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Titulo do caso" 
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                    />
                <textarea 
                    placeholder="Descrição" 
                    onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                    />
                <input 
                    type="text" 
                    placeholder="Valor em reais" 
                    onChange={(e)=>setValue(e.target.value)}
                    value={value}
                    />
                <button className="button" type="submit">Cadastrar</button>
            </form> 
        </div>
    </div>
    );
}