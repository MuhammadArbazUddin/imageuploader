import React from 'react'
import './Screen.css'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Main from '../Main/Main'


function Screen() {
  

  return (
    <>
    <div className="screen">
    <Sidebar/>
      <div className="right">
        <Header/>
        <Main/>
      </div>
    </div>
      
    </>
  )
}

export default Screen
