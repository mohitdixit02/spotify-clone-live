import './CSS/musicdisplay.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { backend_url } from './service component/url_info';
import { useState,useEffect } from 'react';

function Musicdisplay(props) {
    let navg =useNavigate();
    const ctrack=props.current_track;
    const [data,setData] = useState(ctrack);
    useEffect(()=>{
        setData(ctrack);
    },[ctrack]);

    return (
        <>
            <div className='audio_display' style={{ 'backgroundImage': `url(${backend_url + data['song_img']})` }}>
            </div>
            <i className="bi bi-chevron-down" id='ad_back_arrow' onClick={()=>navg(-1)}></i>
            <div className="audio_info">
                <img src={backend_url + data['song_img']} />
                <div className='ad_text_div'>
                    <span className='ad_text_name'>{data['name']}</span>
                    <span className='ad_text_artist'>{data['artist']}</span>
                </div>
            </div>
        </>
    )
}

export default Musicdisplay

