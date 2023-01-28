import React, { useState, useEffect } from 'react'
import { backend_url } from '../service component/url_info'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function User(props) {
  const [buttonstate, setButtonstate] = useState(false);
  const [displayuser, setDisplayuser] = useState('User');
  const user = props.user;
  const setUser = props.setUser;
  const navigate = useNavigate();
  function userBox() {
    if (buttonstate) {
      setButtonstate(false);
      let w = document.getElementsByClassName('user_options');
      if (w) {
        w[0].style.display = 'none';
      }
      let k = document.getElementsByClassName('bi-caret-up-fill');
      if (k) {
        k[0].className = 'bi bi-caret-down-fill';
      }
      let a = document.getElementsByClassName('user');
      if (a) {
        a[0].style.backgroundColor = 'black';
      }
    }
    else {
      setButtonstate(true);
      let w = document.getElementsByClassName('user_options');
      let k = document.getElementsByClassName('bi-caret-down-fill');
      if (k) {
        k[0].className = 'bi bi-caret-up-fill';
      }
      if (w) {
        w[0].style.display = 'block';
      }
      let a = document.getElementsByClassName('user');
      if (a) {
        a[0].style.backgroundColor = 'rgb(40,40,40)';
      }
    }
  }

  // blur out function
  function blur_user() {
    if (buttonstate) {
      setButtonstate(false);
      let w = document.getElementsByClassName('user_options');
      if (w) {
        w[0].style.display = 'none';
      }
      let k = document.getElementsByClassName('bi-caret-up-fill');
      if (k[0]) {
        k[0].className = 'bi bi-caret-down-fill';
      }
      let a = document.getElementsByClassName('user');
      if (a) {
        a[0].style.backgroundColor = 'black';
      }
    }
  }

  //get user name
  setTimeout(() => {
    axios.get(backend_url+'/user/getuser/').then((response) => {
      const resp = response.data[0];
      console.log(resp)
      setDisplayuser(resp['first_name']);
      setUser(resp['user_id']);
    });
  },100);

    //Artist Info function
    function viewProfile() {
      try {
        axios.get(backend_url+'/user/fulluser').then((response) => {
          navigate('/profile', {
            state: {
              'data': response.data[0],
            }
          })
        }
        );
      } catch { }
    }

    if (user == 'none') {
      return (
        <div>
          <div className="user" onClick={userBox}>
            <i className="bi bi-person-circle"></i>
            <span style={{ 'position': 'relative', 'top': '1.5px','fontSize':'11px' }}>{displayuser}</span>
            <i style={{ 'position': 'relative', 'top': '3px' }} className="bi bi-caret-down-fill"></i>
          </div>
          <div className="user_options" onMouseLeave={() => blur_user()} >
            <ul type='none' className='user_opt_list'>
              <li>About Clone</li>
              <hr />
              <a href={`${backend_url}/user/login`}><li>Log in</li></a>
            </ul>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="user" onClick={userBox}>
            <i className="bi bi-person-circle"></i>
            <span style={{ 'position': 'relative', 'top': '1.5px', 'fontSize':'11px' }}>
              {/* {displayuser} */}
              </span>
            <i style={{ 'position': 'relative', 'top': '3px' }} className="bi bi-caret-down-fill"></i>
          </div>
          <div className="user_options">
            <ul type='none' className='user_opt_list' onMouseLeave={() => blur_user()}>
              <li onClick={viewProfile}>Profile</li>
              <li>About Clone</li>
              <hr />
              <a href={`${backend_url}/user/logout`}><li>Log Out</li></a>
            </ul>
          </div>
        </div>
      )
    }
  }

export default User