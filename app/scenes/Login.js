import React from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

import Background from '../components/Background'
import RTextInput from '../components/RequireTextInput'
import Loader from '../components/Loader'
import globalStyles from '../utils/styles'

const styles = StyleSheet.create({
  buttonGreen: {
    color: 'green'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    marginBottom: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  groupButton: {
    height: 120,
    marginTop: 60,
    width: '60%',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  message: {
    textAlign: 'center',
    color: globalStyles.errorColor,
    fontSize: 20
  }
})

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      valid: false,
      logging: false,
      message: ' '
    }
  }

  login() {
    this.setState({ logging: true, message: ' ' })

    axios.post('http://192.168.1.7:3000/api/token', {
      email: this.state.email,
      password: this.state.password,
    }).then(res => {
      this.setState({ logging: false })
      Actions.questions()
    }).catch(err => {
      if (err.request._hasError && err.request._response.indexOf('Failed to connect') !== -1)
        this.setState({ logging: false, message: 'Não foi possível conexão com o servidor. Tente mais tarde' })
      else
        this.setState({ logging: false, message: err.response.data.message })
    })
  }

  emailChange(email) {
    this.setState({
      ...this.state,
      email: email,
      valid: (email && this.state.password) ? true : false,
      message: ' '
    })
  }

  passwordChange(password) {
    this.setState({
      ...this.state,
      password: password,
      valid: (this.state.email && password) ? true : false,
      message: ' '
    })
  }

  render() {
    return (
      <Background>
        <View style={styles.content}>
          <RTextInput placeholder="Email"
            required={true}
            onChangeText={email => this.emailChange(email)}
          />
          <RTextInput placeholder="Senha"
            secureTextEntry={true}
            required={true}
            onChangeText={password => this.passwordChange(password)}
          />
          <Text style={styles.message}>{this.state.message}</Text>
          <View style={styles.groupButton}>
            <Button style={{ width: 100, margin: 20 }} color="#6B6" title="Entrar"
              disabled={!this.state.valid || this.state.logging}
              onPress={this.login.bind(this)} />
            {this.state.logging ? <Loader /> : null}

            <Button style={{ width: 100, margin: 20 }} color="#373" title="Criar Cadastro"
              onPress={this.login.bind(this)} />
          </View>

        </View>
      </Background>
    )
  }
}