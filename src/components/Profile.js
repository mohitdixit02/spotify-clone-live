import React from 'react'
import user_logo from './media/user_logo.png'
import './CSS/Profile.css'
import { useLocation } from 'react-router-dom'

function Profile() {
    const location = useLocation();
    const data=location.state.data;
    console.log(data);
  return (
    <div className="profile_display">
            <div className="head_div">
                <div style={{
                    'backgroundImage': `linear-gradient(180deg,rgb(55, 57, 54), rgb(23, 23, 23))`, 
                    'height': '300px',
                }}></div>
                <div className='profile_top_heading'>
                    <img src={user_logo} />
                    <div className='profile_text'>
                        <ul type='none'>
                            <li style={{'marginLeft':'6px'}}>Profile</li>
                            <li style={{ 'fontSize': '65px' }}>{data['first_name']} {data['last_name']}</li>
                            <br />
                        </ul>
                    </div>
                </div>
            </div>
                <div className="profile_bottom_area">
                    <div className="profile_info">
                        <h3>Profile</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{'color':'white','fontWeight':'bold'}}>Full Name </td>
                                    <td>: {data['first_name']} {data['last_name']}</td>
                                </tr>
                                <tr>
                                    <td style={{'color':'white','fontWeight':'bold'}}>D.O.B </td>
                                    <td>: {data['dob']}</td>
                                </tr>
                                <tr>
                                    <td style={{'color':'white','fontWeight':'bold'}}>Address </td>
                                    <td>: {data['address']}</td>
                                </tr>
                                <tr>
                                    <td style={{'color':'white','fontWeight':'bold'}}>Mobile No </td>
                                    <td>: {data['number']}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
  )
}

export default Profile
