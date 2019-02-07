import { TextInput, Dimensions, StyleSheet, Button, View, Text } from 'react-native';
import React, { Component } from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import { Colors } from '../utils/styles';
import Background from '../components/Background';
import MyQuestions from '../components/questions/MyQuestions'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  },
  textInput: {

    
  },
});

const FirstRoute = () => (
  <Background>
    <Text>Página 1</Text>
  </Background>
);
const SecondRoute = () => (
  <Background>
    
  </Background>
);

export default class Home extends Component {

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Minhas' },
      { key: 'second', title: 'Outras' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: MyQuestions,
          second: SecondRoute,
        })}
        renderTabBar={props =>
          <TabBar
            style={{ backgroundColor: Colors.colorPrimary }}
            {...props}
            indicatorStyle={{ backgroundColor: 'red' }}
          />
        }
        onIndexChange={index => this.setState({ index })}
      />
    );
  }
}