import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableHighlight } from 'react-native'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Home from './scenes/Home'
import Question from './scenes/Question'
import CreateRoom from './scenes/CreateRoom'
import Rooms from './scenes/Rooms'
import Login from './scenes/Login'
import Account from './scenes/Account'
import BackgroundImage from '../assets/img/background_giz.jpg'
import Background from './components/Background'
import Reducers from './stores/reducers'

import leftArrow from '../assets/img/left-arrow.png'
import { Colors } from './utils/styles';

const BackButton = (props) => {
  return (
    <View style={{
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      backgroundColor: Colors.colorPrimary
    }} >
      <View style={{ height: '35%' }} />
      <TouchableHighlight onPress={() => Actions.pop()}>
        <Image source={leftArrow}></Image>
      </TouchableHighlight>
    </View>
  )
}

const Title = (props) => {
  return (
    <View style={{ height: '100%', backgroundColor: Colors.colorPrimary, width: '100%' }}>
      <Text style={style.title}>{props.children}</Text>
    </View>
  )
}

const store = createStore(Reducers)

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="home" component={Home}
              renderTitle={<Title>Questões</Title>}
              initial
            />
            <Scene key="question"
              renderLeftButton={BackButton}
              renderTitle={<Title>Questão</Title>}
              component={Question}
            />
            <Scene key="createRoom"
              renderLeftButton={BackButton}
              renderTitle={<Title>Criar Sala</Title>}
              component={CreateRoom}
            />
            <Scene key="rooms"
              renderLeftButton={BackButton}
              renderTitle={<Title>Salas Disponíveis</Title>}
              component={Rooms}
            />
            <Scene key="login"
              renderTitle={<Title>ACESSO</Title>}
              component={Login}
            />
            <Scene key="account"
              renderTitle={<Title>Cadastro</Title>}
              component={Account}
            />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

const style = {
  title: {
    fontSize: 25,
    // textAlign: 'center',
    marginLeft: 20,
    marginTop: 10,
    color: 'white'
  }
}