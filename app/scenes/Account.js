import React from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'

import Background from '../components/Background'
import RTextInput from '../components/RequireTextInput'
import Loader from '../components/Loader'
import FadeInOutView from '../components/FadeInOutView'

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
  }
})

export default class Account extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      valid: false,
      logging: false,
      message: ' ',
      show: false,
      emailError: 'Email inválido'
    }
  }

  nameChange(name) {
    this.setState({
      ...this.state,
      name: name,
      message: ' '
    })
  }

  emailChange(email) {
    this.setState({
      ...this.state,
      email: email,
      message: ' '
    })
  }

  passwordChange(password) {
    this.setState({
      ...this.state,
      password: password,
      message: ' '
    })
  }

  confirmChange(confirm) {
    this.setState({
      ...this.state,
      confirm: confirm,
      message: ' '
    })
  }

  validateFields() {

  }

  toLogin() {
    this.setState({ show: !this.state.show })
  }

  send() {

  }

  render() {
    return (
      <Background>
        <View style={styles.content}>
          <RTextInput placeholder="Nome"
            required={true}
            onChangeText={name => this.nameChange(name)}
          />

          <RTextInput placeholder="Email"
            required={true}
            errorMessage={this.state.emailError}
            onChangeText={email => this.emailChange(email)}
          />

          <RTextInput placeholder="Senha"
            required={true}
            onChangeText={password => this.passwordChange(password)}
          />

          <RTextInput placeholder="Confirme a senha"
            required={true}
            onChangeText={confirm => this.confirmChange(confirm)}
          />

          <Text style={{ color: '#F33', fontSize: 20 }}>{this.state.message}</Text>
          <View style={styles.groupButton}>
            <Button style={{ width: 100, margin: 20 }} color="#6B6" title="Enviar"
              disabled={!this.state.valid || this.state.logging}
              onPress={this.send.bind(this)} />
            {this.state.logging ? <Loader /> : null}

            <Button style={{ width: 100, margin: 20 }} color="#373" title="Já tenho uma conta"
              onPress={this.toLogin.bind(this)} />
          </View>
          <Text>{this.state.show ? 'Show' : 'Hide'}</Text>
          <FadeInOutView visible={this.state.show}>
            <Text style={{ color: '#F33', fontSize: 20 }}>78</Text>
          </FadeInOutView>
        </View>
      </Background>
    )
  }
}