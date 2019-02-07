import React from 'react'
import { Text, View, TextInput } from 'react-native'

import FadeInOutView from '../components/FadeInOutView'
import styles from '../utils/styles'

export default class RequireTextInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = { invalid: false, text: '' }
  }

  render() {
    return (
      <View style={{ width: '80%' }}>
        <TextInput
          placeholder={this.props.placeholder}
          underlineColorAndroid="#ccc"
          placeholderTextColor="#ccc"
          style={{ fontSize: 30, color: 'white' }}
          secureTextEntry={this.props.secureTextEntry}
          onBlur={() => {
            this.setState({
              ...this.state,
              invalid: (!this.state.text || (this.props.pattern && this.props.pattern.test(this.state.text)))
            })
          }}
          onChangeText={text => {
            this.setState({ text })
            if (this.state.invalid)
              this.setState({
                ...this.state,
                invalid: (!this.state.text || (this.props.pattern && this.props.pattern.test(this.state.text)))
              })
            if (this.props.onChangeText)
              this.props.onChangeText(text)
          }} />
        <FadeInOutView duration={150} visible={this.state.invalid}>
          <Text style={{ marginLeft: 18, marginTop: -4, color: styles.errorColor, fontSize: 20 }}>
            * {
              this.state.text && this.props.errorMessage
                ? this.props.errorMessage
                : 'Informe os dados deste campo'
            }
          </Text>
        </FadeInOutView>
      </View>
    )
  }
}