import React from 'react'
import { View, Text, ImageBackground } from 'react-native'

import backgroundImage from '../../assets/img/background_giz.jpg'

export default (props) => {
  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={backgroundImage}>
      {props.children}
    </ImageBackground>
  )
}