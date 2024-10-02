import React from 'react'
import './Sidebar.css'
import { IoMdGlobe } from "react-icons/io";


function Sidebar() {
  

  return (
    <>
      <div className="sidebar">
        
        <div className="btns">
        <div className="globe-btn">
                <IoMdGlobe className='icon'/>
            </div>
        </div>
            
        
        
      </div>
    </>
  )
}

export default Sidebar