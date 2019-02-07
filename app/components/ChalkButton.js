import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 30,
      textAlign: 'center',
      margin: 10,
      fontFamily: "coalhandluke",
      color: props.color || 'white'
    },
    button: {
      backgroundColor: props.backgroundColor || '#0000',
    }
  })

  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  )
}