import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Logout = ({setIsAuth}) => {
  const navigate = useNavigate();
  const logout = () => {
    //Googleでログアウト
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate('/lp');
  });
};
  return (
    <div>
      <p>ログアウトする</p>
      <button onClick={ logout }>ログアウト</button>
    </div>
  )
}

export default Logout
