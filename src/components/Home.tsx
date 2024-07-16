import React from "react";
import {useState} from 'react';
import '../css/style.css'
import avatar from '../assets/avatar.jpg'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import github from '../assets/github.png'
import { Helmet } from "react-helmet-async";


const Home = () => {
    const [facebookUrl, setFacebookUrl] = useState('https://www.facebook.com/kyle.mai261/');
    const [instagramUrl, setInstagramUrl] = useState('https://www.instagram.com/_kyle_intothevoid/');
    const [githubUrl, setGithubUrl] = useState('https://github.com/Kyle8Bits');
    

    return(
        <>
            <Helmet>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" />
            </Helmet>

        <header className="container">
            <div className="content">
                <h4>JUNIOR FROM RMIT UNIVERSITY VIETNAM</h4>
                <h1>Hi, I'm <span>Kyle</span>, Software Engineer</h1>
                <p className="script">
                   My very first pofortlio website using React. 
                   You can find anything about my information through out college years.
                    Feel free to <span className="contacts">contact me.</span> <i className="ri-arrow-right-line" style={{ color: "white" }}></i>
                </p>
                <ul className='nav-image'>
                    <li className='link-image'> 
                        <a className =" facebook_button" href={facebookUrl} target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook"/>
                        </a>
                    </li>
                    <li className='link-image'> 
                        <a className =" instagram_button" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt="Instagram"/>
                        </a>
                    </li>
                    <li className='link-image'> 
                        <a className =" github_button" href={githubUrl} target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="Github"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="avatar_group">
                <img src = {avatar}></img>
            </div>
        </header>

    </>
    );
}

export default Home;
