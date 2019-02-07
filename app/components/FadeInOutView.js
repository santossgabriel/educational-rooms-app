import React from 'react'
import { View, Text, TextInput, Animated } from 'react-native'

import globalStyles from '../utils/styles'

export default class FadeInOutView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(this.props.visible ? 1 : 0),
      visible: this.props.visible
    }
  }

  componentDidUpdate() {
    if (this.state.visible != this.props.visible) {
      this.state.fadeAnim.setValue(this.props.visible ? 0 : 1)
      Animated.timing(this.state.fadeAnim, {
        toValue: this.props.visible ? 1 : 0,
        duration: this.props.duration || 300,
      }).start();
      this.setState({ visible: this.props.visible })
    }
  }

  render() {
    return (

      <Animated.View
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim,
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}