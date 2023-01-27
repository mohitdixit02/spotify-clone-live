import React, { useState, useEffect } from 'react';
import './CSS/Leftpannel.css'
import { ref, set, onValue, remove } from "firebase/database"
import database from './Firebase/Firebase'
import { useNavigate, Link } from 'react-router-dom'
import logo from './media/leftpannel_logo.png'

const Leftpannel = (props) => {
    const user = props.user;
    setTimeout(() => {
        let w = document.getElementsByClassName('Link')
        for (let item of w) {
            item.className = 'Link';
        }
        if (props.state != 'none') {
            let active = document.getElementById(props.state);
            try {
                active.className = 'Link active';
            } catch { }
        }
    }, 10)

    const navigate = useNavigate();

    //Managing Playlist
    const [playlist_length, setPlaylistlength] = useState(0);
    const [playlist_set, setPlaylistset] = useState([{ 'name': '' }]);

    setTimeout(() => {
        onValue(ref(database, 'users/' + user + '/playlist/'), (snapshot) => {
            const value = snapshot.val()
            if (!value) {
                setPlaylistlength(0);
            }
            else {
                setPlaylistlength(Object.keys(value).length);
                let temp_arr = [];
                for (let key in value) {
                    temp_arr.push(value[key]);
                }
                setPlaylistset(temp_arr);
            }
        })
    });

    //new playlist
    async function new_playlist() {
        set(ref(database, 'users/' + user + '/playlist/list' + `${(playlist_length + 1)}`), {
            'data': [],
            'name': `My Playlist #${playlist_length + 1}`,
            'url': `list${playlist_length + 1}`
        })


        navigate('/playlist', {
            state: {
                'url': `list${playlist_length + 1}`,
                'data': [],
                'type': 'new',
                'name': `My Playlist #${playlist_length + 1}`
            }
        })

        //color change
        let k = document.getElementsByClassName('list_left_class');
        try {
            for (let elem of k) {
                elem.className = 'list_left_class'
            }
        } catch { }
        setTimeout(() => {
            let act_k = document.getElementById(`list${playlist_length + 1}`);
            try {
                act_k.className = 'list_left_class active_list'
            } catch { }
        }, 10)
    }


    function open_playlist(value) {
        //color change
        let k = document.getElementsByClassName('list_left_class');
        try {
            for (let elem of k) {
                elem.className = 'list_left_class'
            }
        } catch { }
        let act_k = document.getElementById(value);
        try {
            act_k.className = 'list_left_class active_list'
        } catch { }

        onValue(ref(database, 'users/' + user + '/playlist/' + value + '/'), (snapshot) => {
            const data = snapshot.val();
            navigate('/playlist', {
                state: {
                    'data': data,
                    'url': value,
                }
            })
        })
    }

    // deleting playlist function
    function delete_playlist(url) {
        remove(ref(database, 'users/' + user + '/playlist/' + url + '/'));
        if (window.location.pathname.includes('playlist')) {
            navigate('/');
        }
    }

    // reset playlist link
    useEffect(() => {
        if (!window.location.pathname.includes('playlist')) {
            let k = document.getElementsByClassName('list_left_class');
            try {
                for (let elem of k) {
                    elem.className = 'list_left_class'
                }
            } catch { }
        }
        let k = document.getElementById('liked');
        if (window.location.pathname.includes('liked')) {
            try {
                // k.className='liked_songs_active';
                // console.log(k);
                k.children[1].style.color = 'white';
                k.style.opacity = '100%';
            } catch { }
        }
        else {
            try {
                // k.className='';
                k.children[1].style.color = 'lightgray';
                k.style.opacity = '70%';
            } catch { }
        }
    }, [window.location.pathname])

    return (
        <div className='leftpannel'>
            <div className="left_logo">
                <img src={logo} />
            </div>
            <div className='leftdx'>
                <div className='left1'>
                    <ul type='none'>
                        <Link className='Link' to='/' id='home'><li><i className="bi bi-house-door-fill"></i><span> Home</span></li></Link>
                        <Link className='Link' to='/search' id='search'><li><i className="bi bi-search" ></i><span> Search</span></li></Link>
                        <Link className='Link' to='/library' id='library'><li><i className="bi bi-collection" ></i><span> Your Library</span></li></Link>
                    </ul>
                </div>
                <div className='left2'>
                    <ul type='none'>
                        <li id='create' onClick={() => new_playlist()}><i className="bi bi-plus" ></i><span> Create Playlist</span></li>
                        <Link className='Link' to='/liked'><li id='liked'>
                            <i className="bi bi-heart-fill likedheart" ></i>
                            <span> Liked Songs</span></li></Link>
                    </ul>
                </div>
                <br />
                <hr className='hr' />
                <div className="playlist_section">
                    <ul type='none' id='playlist_holder_pannel'>
                        {
                            playlist_set.map((value, index) => {
                                if(value['name']!='') {
                                    return (
                                        <li key={index} className='list_left_class'><span onClick={(e) => open_playlist(e.target.id)} id={value.url}>{value.name}</span><i className="bi bi-x" id={value.url} onClick={(e) => { delete_playlist(e.target.id) }}></i></li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Leftpannel;