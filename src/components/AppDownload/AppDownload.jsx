import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download <br /> Food Ordering App</p>
      <div className="app-download-platforms">
        <a href="https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader" target="_blank" rel="noopener noreferrer">
          <img src={assets.play_store} alt="" />
        </a>
        <a href="https://itunes.apple.com/in/app/id989540920?referrer=utm_source%3Dswiggy%26utm_medium%3Dhomepage" target="_blank" rel="noopener noreferrer">
          <img src={assets.app_store} alt="" />
        </a>
      </div>
    </div>
  )
}

export default AppDownload
