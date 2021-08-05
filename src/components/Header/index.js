import React, { useState, useEffect } from 'react';
import * as S from './styles';
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';
import { Link } from "react-router-dom";
import api from '../../services/api';
import isConnected from '../../utils/isConnected';


function Header({ clickNotification  }) {

  const [lateCount, setLateCount] = useState();

  /**Carrega as tarejas atrasadas no sino*/
  async function lateVerify(){
    await api.get(`/task/filter/late/${isConnected}`)
    .then(response =>{
      setLateCount(response.data.length)
    })
  }

  useEffect(() =>{
    lateVerify();
  })

  async function Logout(){
    localStorage.removeItem('@todo/macaddress');
    window.location.reload();
  }

  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logo" />
      </S.LeftSide>
      <S.RightSide>
        <Link to="/">INÍCIO</Link>
        <span className="divisor"/>
        <Link to="/task">NOVA TAREFA</Link>
        <span className="divisor"/>
        { !isConnected ?
          <Link to="/QrCode">SINCRONIZAR CELULAR</Link>
          :
          <button type="button" onClick={Logout}>SAIR</button>
        }
        { 
          lateCount &&
          < /**to inglobando todo mundo nessa chave para a nossa condição funcionar */>
            <span className="divisor"/>
            <button id="notification" onClick={clickNotification}>
              <img src={bell} alt="Notificação"/>
              <span>{lateCount}</span>
            </button>
          </>
        }
      </S.RightSide>
    </S.Container>
  )
}

export default Header;
