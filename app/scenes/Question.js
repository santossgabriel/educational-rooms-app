import React from 'react'
import { TextInput, TouchableOpacity, Picker, View, Button, Text } from 'react-native'
import StepIndicator from 'react-native-step-indicator'
import { Colors } from '../utils/styles'
import Background from '../components/Background'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import { TextInputLayout } from 'rn-textinputlayout'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import CategoryQuestion from '../components/questions/CategoryQuestion'
import AskQuestion from '../components/questions/AskQuestion'
import PointsQuestion from '../components/questions/PointsQuestion'
import AnswersQuestion from '../components/questions/AnswersQuestion'
import { categoryChanged, pointsChanged, askChanged, answersChanged } from '../stores/question/actions'
import { connect } from 'react-redux'

const labels = ['Categoria', 'Pergunta', 'Pontos', 'Alternativas'];
const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.colorPrimary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: Colors.colorPrimary,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Colors.colorPrimary,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Colors.colorPrimary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.colorPrimary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 15,
  currentStepLabelColor: Colors.colorPrimary
}

class QuestionStepper extends React.Component {

  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      mounted: false,
      categories: [],
      category: {},
      question: props.question,
      index: 0,
      routes: [
        { key: 'category' },
        { key: 'ask' },
        { key: 'points' },
        { key: 'alternatives' }
      ],
      currentPosition: 0
    }
    if (this.props.question.category)
      this.props.notifyCategoryChanged(this.props.question.category)
    if (this.props.question.description)
      this.props.notifyAskChanged(this.props.question.description)
    if (this.props.question.points)
      this.props.notifyPointsChanged(this.props.question.points)
    if (this.props.question.answers)
      this.props.notifyPointsChanged(this.props.question.answers)
  }

  changePage(step) {
    const index = this.state.index + step
    if (index >= 0 && index <= 3) {
      this.setState({
        currentPosition: index,
        index: index
      });
    }
  }

  saveQuestion() {
    const { editQuestion } = this.props
    const question = {
      appId: this.state.question ? this.state.question.appId : 0,
      description: editQuestion.ask,
      answers: editQuestion.answers,
      points: editQuestion.points,
      category: editQuestion.category.selected
    }
    console.warn(question)
  }

  render() {
    return (
      <Background>
        <View style={{ marginTop: 20 }} />
        <StepIndicator
          customStyles={customStyles}
          stepCount={4}
          onPress={(position) => { console.warn(position) }}
          currentPosition={this.state.currentPosition}
          labels={labels}
        />

        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            category: () => (
              <CategoryQuestion invalid={this.state.invalidCategory} next={() => this.changePage(1)} />
            ),
            ask: () => (
              <AskQuestion invalid={this.state.invalidAsk}
                next={() => this.changePage(1)}
                back={() => this.changePage(-1)}
              />
            ),
            points: () => (
              <PointsQuestion
                next={() => this.changePage(1)}
                back={() => this.changePage(-1)}
              />
            ),
            alternatives: () => (
              <AnswersQuestion
                next={() => this.saveQuestion()}
                back={() => this.changePage(-1)}
              />
            )
          })}
          renderTabBar={props => null}
          onIndexChange={index => this.setState({ index })}
        />
      </Background>
    )
  }
}

const mapStateToProps = state => ({ editQuestion: state.question })
const mapDispatchToProps = dispatch => ({
  notifyCategoryChanged: category => dispatch(categoryChanged(category)),
  notifyAskChanged: ask => dispatch(askChanged(ask)),
  notifyPointsChanged: points => dispatch(pointsChanged(points))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionStepper)