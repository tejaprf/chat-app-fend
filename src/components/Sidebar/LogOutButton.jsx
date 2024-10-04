import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import api from '../../apis';

export const LogOutButton = () => {

  const handleLogout=()=>{ 
    api.post('auth/logout/');
    window.location.reload();
  };
  return (
    <div onClick={handleLogout}>
        <BiLogOut className='w-7 h-7 ' />
    </div>
  )
}
