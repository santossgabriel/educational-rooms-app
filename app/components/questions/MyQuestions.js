import React, { Component } from 'react'
import { StyleSheet, Slider, ListView } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'

import Background from '../Background'
import { QuestionListItem } from './ListItemComponents'
import { Colors } from '../../utils/styles'

import { connect } from 'react-redux'
import { categoryChanged } from '../../stores/question/actions'

class MyQuestions extends Component {
  constructor(props) {
    super()
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        .cloneWithRows([])
    }
  }

  componentDidMount() {
    // questionRepository.getAll().then(questions => {
    //   const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    //   this.setState({ dataSource: ds.cloneWithRows(questions) })
    // })
  }

  render() {
    return (
      <Background>
        <IconMaterial.Button name="facebook" backgroundColor="#3b5998">
          Logar com Facebook
        </IconMaterial.Button>
        <Slider minimumValue={10} onValueChange={} maximumValue={120} step={2} />
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(item) =>
            <QuestionListItem item={item} onPress={(i) => Actions.question({ question: i })} />
          } />
        <ActionButton buttonColor={Colors.colorPrimary}>
          <ActionButton.Item buttonColor={Colors.colorPrimary} title="Criar Questão" onPress={() => this.props.notifyCategoryChanged('minha nova categoria')}>
            <IconMaterial name="comment-plus-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#CC5555' title="Notificações" onPress={() => { }}>
            <IconMaterial name="bell-ring" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Salas" onPress={() => { }}>
            <IconMaterial name="forum" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Conta" onPress={() => { }}>
            <Icon name="md-build" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Background>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 30,
    height: 30,
    color: 'white',
  },
})

const mapStateToProps = (state) => {
  return {
    question: state.question
  }
}

const mapDispatchToProps = (dispatch) => ({
  notifyCategoryChanged: (newCategory) => dispatch(categoryChanged(newCategory))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestions)