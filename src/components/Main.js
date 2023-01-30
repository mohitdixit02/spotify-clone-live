import React, { useState, useEffect } from 'react';
import './CSS/main.css';
import img_data from './mediafile.js'
import p from './media/playicon.jpg'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GetSong, GetArtist, GetArtistinfo, GetAlbuminfo, GetMusicinfo, GetCategory } from './service component/server_request_functions';
import { backend_url } from './service component/url_info';

const Main = (props) => {
    let trackfn = props.trackfn;
    const navigate = useNavigate();

    // Wish Time
    function current_time() {
        let k = new Date();
        let h = k.getHours()
        if (h <= 12) {
            return ('Good Morning');
        }
        else if (h > 12 && h < 16) {
            return ('Good Afternoon');
        }
        else {
            return ('Good Evening');
        }
    }
    let ctime = current_time();

    //audio playing function
    function playaudio(e) {
        let play_id = e.target.id;
        play_id = play_id.substr(0, play_id.length - 5);
        try {
            axios.get(backend_url + `/req_data/${play_id}`).then((response) => {
                trackfn([response.data[0]]);
            })
        } catch { }
    }

    //Artist Info function
    function artistinfo(e) {
        if (!e.target.id.includes('play')) {
            try {
                GetArtistinfo(e.target.id).then((response) =>
                    navigate('/info', {
                        state: {
                            'data': response,
                            'type': 'artist'
                        }
                    })
                );
            } catch { }
        }
    }

    //Music Info function
    function musicinfo(e) {
        if (!e.target.id.includes('play')) {
            try {
                GetMusicinfo(e.target.id).then((response) => {
                    navigate('/info', {
                        state: {
                            'data': response,
                            'type': 'music'
                        }
                    })
                })
            } catch { }
        }
    }
    //Album Calling function
    function getAlbum(e) {
        try {
            GetAlbuminfo(e.target.id).then((response) => {
                navigate('/info', {
                    state: {
                        'data': response,
                        'type': 'album'
                    }
                })
            })
        } catch { }
    }

    //Category Calling Function
    function showCategory(value) {
        try {
            GetCategory(value).then((response) => {
                navigate('/catg', {
                    state: {
                        'data': response,
                        'type': 'Category'
                    }
                })
            })
        } catch { }
    }

    //All Artists Calling function
    function showArtistlist() {
        try {
            GetArtist().then((data) => {
                navigate('/catg', {
                    state: {
                        'data': data,
                        'type': 'artist'
                    }
                })
            }).catch((error) => { })
        } catch { }
    }

    //Artist Play
    function artistPlay(e) {
        let play_id = e.target.id;
        play_id = play_id.substr(0, play_id.length - 5);
        try {
            axios.get(backend_url + `/req_data/artist/${play_id}`).then((response) => {
                let temp = response.data[0]
                trackfn(temp['artist_song_list']);
            })
        } catch (error) { }
    }

    //liked album navigation
    const [song_data, setData] = useState([]);
    const user = props.user;
    function liked_album(e) {
        // Fetching Song_data
        // if (user != 'none') {
        //     onValue(ref(database, 'users/' + user + '/liked/'), (snapshot) => {
        //         const value = snapshot.val();
        //         if (value) {
        //             const value_length = Object.keys(value).length;
        //             let temp_array = song_data;
        //             let array_length = temp_array.length;
        //             for (let key in value) {
        //                 if (array_length < value_length) {
        //                     let temp = value[key];
        //                     temp = temp['song'];
        //                     temp_array.push(temp);
        //                     array_length++;
        //                 }
        //             }
        //             setData(song_data);

        //             // sending data
        //             alert('navg target')
        //             console.log(e.target);
        //             navigate('/liked', {
        //                 state: {
        //                     'data': song_data,
        //                     'length': value_length
        //                 }
        //             })
        //         }
        //         else {
        //             // sending data
        //             navigate('/liked', {
        //                 state: {
        //                     'data': 'none',
        //                     'length': null
        //                 }
        //             })
        //         }
        //     })
        // }
        // else {
        //     navigate('/liked', {
        //         state: {
        //             'data': 'User',
        //             'length': null
        //         }
        //     })
        // }
    }

    // Data Fetch on loading
    const [data, getData] = useState([]);
    const [artist, getArtistData] = useState([]);
    useEffect(() => {
        let load_value = false
        if (!load_value) {
            try {
                GetSong().then((data) => getData(data)).catch((error) => {
                    if (error) {
                        let w = document.getElementsByClassName('main');
                        w[0].style.display = 'none';
                        let k = document.getElementsByClassName('error_div');
                        k[0].style.display = 'block';
                    }
                });
                GetArtist().then((data) => {
                    if (data.length < 5) {
                        getArtistData(data)
                    }
                    else {
                        let temp = data.splice(0, 5);
                        getArtistData(temp);
                    }
                }).catch((error) => {
                    if (error.message == 'Network Error') {
                        let w = document.getElementsByClassName('main');
                        w[0].style.display = 'none';
                        let k = document.getElementsByClassName('error_div');
                        k[0].style.display = 'block';
                    }
                });
            } catch (error) { }
        }
        load_value = true
    }, []);

    //Return
    return (
        <>
            <div className='main'>
                <div className="main_holder">
                    <div className='album'>
                        <div id='wish'>{ctime}</div><br />
                        <div className="respndiv_album">
                            <div className="albumflex">
                                <Link style={{ 'textDecoration': 'none', 'color': 'white' }} to='/liked'>
                                    <div className="topbox" onMouseEnter={getelement_top} onMouseLeave={removeelement_top} id='liked songs'>
                                        <i className="bi bi-heart-fill likedheart" id='likedalbum' />
                                        <div className="topbox_text">
                                            Liked Songs
                                        </div>
                                        <img src={p} className='playicon_design' onClick={playaudio} />

                                    </div></Link>
                                <div className="topbox" onClick={getAlbum} id={'No Competition'}>
                                    <div>
                                        <img src={img_data['No Competition']} alt="Image" className="topbox_img" id={'No Competition'} />
                                    </div>
                                    <div className="topbox_text" id={'No Competition'}>
                                        No Competition
                                    </div>
                                </div>
                                <div className="topbox" id={'Rambo'} onClick={getAlbum}>
                                    <div>
                                        <img src={img_data['Rambo']} alt="Image" className="topbox_img" id={'Rambo'} />
                                    </div>
                                    <div className="topbox_text" id={'Rambo'}>
                                        Rambo
                                    </div>
                                </div>
                            </div> <br />
                            <div className="albumflex">
                                <div className="topbox" onClick={artistinfo} id={'Karan Aujla'}>
                                    <div>
                                        <img src={img_data['Karan Aujla']} alt="Image" className="topbox_img" id={'Karan Aujla'} />
                                    </div>
                                    <div className="topbox_text" id={'Karan Aujla'}>
                                        Karan Aujla
                                    </div>
                                </div>
                                <div className="topbox" onClick={musicinfo} id={2}>
                                    <div>
                                        <img src={img_data["Braat"]} alt="Image" className="topbox_img" id={2} />
                                    </div>
                                    <div className="topbox_text" id={2}>
                                        Braat
                                    </div>
                                </div>
                                <div className="topbox" onClick={musicinfo} id={10}>
                                    <div>
                                        <img src={img_data['Kesariya']} alt="Image" className="topbox_img" id={10} />
                                    </div>
                                    <div className="topbox_text" id={10}>
                                        Kesariya
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        data.map((genere_key, index) => {
                            let song_array = genere_key.list[0]
                            if (song_array.length > 5) {
                                song_array = song_array.slice(0, 5);
                            }
                            return (
                                <div className="genbox_main" key={index}>
                                    <div className='heading_holder_main'>
                                        <div className='heading'>{genere_key.genere}</div><br />
                                        <div className="allopt" id={genere_key.genere} onClick={(e) => { showCategory(e.target.id) }}>SEE ALL</div>
                                    </div>
                                    <div className="genbox_flex">
                                        {
                                            song_array.map((song_key) => {
                                                return (
                                                    <div key={song_key.id} className='cover_box'>
                                                        <div className="genbox">
                                                            <div>
                                                                <img src={backend_url + `${song_key.song_img}`} alt="Image" className="genbox_img" />
                                                            </div>
                                                            <div className="genbox_text1">
                                                                {song_key.name}
                                                            </div>
                                                            <div className="genbox_text2">
                                                                {song_key.artist}
                                                            </div>
                                                        </div>
                                                        <div className="music_cover" id={song_key.id} onMouseEnter={getelement} onMouseLeave={removeelement} onClick={musicinfo}>
                                                            <img src={p} className='playicon_design' onClick={playaudio} id={`${song_key.id} play`} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                    <div className="genbox_main">
                        <div style={{ 'display': 'flex', 'margin': '10px 0px 18px 10px', 'columnGap': '26vw' }}>
                            <div className='heading'>Artist</div><br />
                            <div className="allopt" onClick={showArtistlist}>SEE ALL</div>
                        </div>
                        <div className="genbox_flex">
                            {
                                artist.map((artist_key) => {
                                    let temp = artist_key[0];
                                    return (
                                        <div key={temp.id} className='cover_box' >
                                            <div className="genbox">
                                                <div>
                                                    <img src={backend_url + `${temp.artist_img}`} alt="Image" className="genbox_img artist" />
                                                </div>
                                                <div className="genbox_text1 artisttext">
                                                    {temp.name}
                                                </div>
                                                <div className="genbox_text2">Artist</div>
                                            </div>
                                            <div className="artist_cover" id={temp.name} onMouseEnter={getelement} onMouseLeave={removeelement} onClick={artistinfo}>
                                                <img src={p} className='playicon_design' id={`${temp.name} play`} onClick={artistPlay} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <br /> <br /> <br />
                </div>
            </div>
            <div className='error_div'>
                <i className="bi bi-emoji-frown"></i>
                <div>Unfortunately, Server is not responding..</div>
            </div>
        </>
    );
}


// JS Begins
//Play icon for genbox
function getelement(e) {
    let w = document.getElementById(`${e.target.id} play`)
    try {
        w.style.display = 'block'
        setTimeout(() => {
            w.className = `playicon_design animateicon`
        }, 200)
    } catch (error) { }
}
function removeelement(e) {
    let w = document.getElementsByClassName('playicon_design')
    try {
        for (let item of w) {
            item.style.display = 'none'
            item.className = `playicon_design`
        }
    } catch (error) { }
}

// TopBox playicon
function getelement_top(e) {
    let w = document.getElementById(`${e.target.id} play`)
    try {
        w.style.display = 'block'
        setTimeout(() => {
            w.className = `playicon_design2 animateicon2`
        }, 100)
    } catch (error) { }
}
function removeelement_top(e) {
    let w = document.getElementsByClassName('playicon_design2')
    try {
        for (let item of w) {
            item.style.display = 'none'
            item.className = `playicon_design2`
        }
    } catch (error) { }
}

export default Main;
