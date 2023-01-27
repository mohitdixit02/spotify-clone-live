import './CSS/Open.css'
import p from './media/playicon.jpg'
import tick from './media/tick.jpg'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import OpenSonglist from './OpenSonglist'

const Open = (props) => {
    const location = useLocation();
    if (location.state.type == 'music') {
        let temp = location.state.data[0];
        let song_data=location.state.data
        song_data=song_data[0]

        //Play fn
        function play_open_audio(){
            props.trackfn([song_data]);
        }

        return (
        <div className="open_display">
            <div className="top_div">
                <div style={{
                    'backgroundImage': `linear-gradient(180deg,rgba(210,58,95,255),rgba(115,31,50,255))`,
                    'height': '300px',
                }}></div>
                <div className='open_top_heading'>
                    <img src={`${temp.song_img}`} style={{
                        'height': '235px',
                        'width': '235px',
                        'padding': '0px 20px 20px 45px ',
                    }} />
                    <div className='heading_text'>
                        <ul type='none'>
                            <li style={{'marginLeft':'6px'}}>{temp.album}</li>
                            <li style={{ 'fontSize': '80px' }}>{temp.name}</li>
                            <br />
                            <li style={{'marginLeft':'6px'}}>{temp.artist}.1 song</li>
                        </ul>
                    </div>
                </div>
            </div>
                <div className="open_bottom_area" style={{'backgroundImage': `linear-gradient(180deg,rgba(77,23,37,255),rgba(18,19,19,255)`}}>
                    <div>
                        <div style={{ 'display': 'flex' }}>
                            <img src={p} className='playicon_open' onClick={play_open_audio} />
                            <i className="bi bi-arrow-down-circle-fill"></i>
                        </div>
                    </div>
                    <OpenSonglist songlist={song_data} type={'music'} tracklist={props.track} actvfn={props.actvfn} trackfn={props.trackfn} ctrack={props.current_track} user={props.user}/>
                </div>
            </div>
        )
    }
    else if (location.state.type == 'artist') {
        const page_data=location.state.data[0];
        let artist_info= page_data['artist_info'];
        let artist_song_data=(page_data['artist_song_list']);
        artist_info=artist_info[0];
        let listn=artist_info.monthly_listeners
        listn=listn.toLocaleString();

        //play fn
        function play_open_artistaudio(){
            let trackfn=props.trackfn
            trackfn(artist_song_data);
        }
        return (
        <div className="open_display">
            <div className="top_div">
                <div style={{
                    'backgroundImage': `linear-gradient(180deg,rgba(48,88,208,255),rgba(27,47,113,255)
                    )`,
                    'height': '300px',
                }}></div>
                <div className='open_top_heading'>
                    <img src={`${artist_info.artist_img}`} style={{
                        'height': '220px',
                        'width': '220px',
                        'marginTop':'20px',
                        'marginLeft':'40px',
                        'borderRadius':'300px'
                    }} />
                    <div className='heading_text' style={{'paddingTop':'28px'}}>
                        <ul type='none'>
                            <li style={{'display':'flex'}}><img src={tick} height={'40px'} width={'75px'}/><span style={{'position':'relative','top':'10px', 'right':'18px'}}>Verified Artist</span>
                            </li>
                            <li style={{ 'fontSize': '90px', 'marginLeft':'28px' }}>{artist_info.name}</li>
                            <br />
                            <li style={{'marginLeft':'28px'}}>{listn} monthly listeners</li>
                        </ul>
                    </div>
                </div></div>
                <div className="open_bottom_area" style={{'backgroundImage': `linear-gradient(180deg,rgba(21,35,79,255),rgba(18,19,19,255)`}}>
                    <div>
                        <div style={{ 'display': 'flex' }}>
                            <img src={p} className='playicon_open' onClick={play_open_artistaudio} />
                            <i className="bi bi-arrow-down-circle-fill"></i>
                        </div>
                    </div>
                    <OpenSonglist ctrack={props.current_track} trackfn={props.trackfn} songlist={artist_song_data} tracklist={props.track} type={'album'} actvfn={props.actvfn} user={props.user}/>
                    <div className="about">
                        <h1>About</h1>
                        <br />
                        <div className="aboutflex">
                        <div style={{'height':'450px','width':'800px','overflow':'hidden'}}>
                        <img src={`${artist_info.about_img}`} className='aboutimg'/>
                        </div>
                        <div style={{'paddingTop':'30px'}}>
                            <div style={{'fontSize':'22px', 'fontWeight':'bold'}}>{listn} Monthly Listeners</div> <br /> <br />
                            <div className='aboutinfo'>{artist_info.about}</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if (location.state.type == 'album') {
        const song_data=location.state.data;
        let temp=song_data[0];
        function play_open_album(){
            props.trackfn(song_data);
        }

        //no of songs
        function no_of_songs(){
            if(song_data.length>1){
                return(
                    <>
                    {song_data.length} songs
                    </>
                )
            }
            else{
            return(
                <>
                 {song_data.length} song
                </>
            )}
        }

        let song_no=no_of_songs();

        return (
        <div className="open_display">
            <div className="top_div">
                <div style={{
                    'backgroundImage': `linear-gradient(180deg,rgba(210,58,95,255),rgba(115,31,50,255))`,
                    'height': '300px',
                }}></div>
                <div className='open_top_heading'>
                    <img src={`${temp.song_img}`} style={{
                        'height': '235px',
                        'width': '235px',
                        'padding': '0px 20px 20px 45px ',
                    }} />
                    <div className='heading_text'>
                        <ul type='none'>
                            <li style={{'marginLeft':'6px'}}>Album</li>
                            <li style={{ 'fontSize': '80px' }}>{temp.album}</li>
                            <br />
                            <li style={{'marginLeft':'6px'}}>{temp.artist} . {song_no}</li>
                        </ul>
                    </div>
                </div>
            </div>
                <div className="open_bottom_area" style={{'backgroundImage': `linear-gradient(180deg,rgba(77,23,37,255),rgba(18,19,19,255)`}}>
                    <div>
                        <div style={{ 'display': 'flex' }}>
                            <img src={p} className='playicon_open' onClick={play_open_album} />
                            <i className="bi bi-arrow-down-circle-fill"></i>
                        </div>
                    </div>
                    <OpenSonglist ctrack={props.current_track} trackfn={props.trackfn} songlist={song_data} tracklist={props.track} type={'album'} actvfn={props.actvfn} user={props.user}/>
                </div>
            </div>
        )
    }
}

export default Open
