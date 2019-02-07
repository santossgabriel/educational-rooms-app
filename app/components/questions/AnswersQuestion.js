import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { TextInputLayout } from 'rn-textinputlayout'
import { connect } from 'react-redux'
import RadioButton from 'radio-button-react-native'

import { answersChanged } from '../../stores/question/actions'

import FooterStepper from '../stepper/footerStepper'
import { Colors } from '../../utils/styles'

const CustomRB = (props) => (
  <View style={{ marginLeft: 10, marginRight: 10 }}>
    <RadioButton

      {...props}
      outerCircleColor='white'
      outerCircleSize={30}
      outerCircleWidth={4}
      innerCircleColor={Colors.colorPrimary}
      innerCircleSize={16} >
      <Text style={{ marginLeft: 5, fontSize: 20, color: 'white' }}>{props.label}</Text>
    </RadioButton>
  </View>
)

class AnswersQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    const answers = props.question.answers
    this.state = {
      invalid: false,
      correct: answers.filter(p => p.correct)[0].classification,
      a: answers.filter(p => p.classification === 'A')[0].description,
      b: answers.filter(p => p.classification === 'B')[0].description,
      c: answers.filter(p => p.classification === 'C')[0].description,
      d: answers.filter(p => p.classification === 'D')[0].description
    }
  }

  aChanged(txt) {
    this.setState({ a: txt, aInvalid: false })
  }

  bChanged(txt) {
    this.setState({ b: txt, bInvalid: false })
  }

  cChanged(txt) {
    this.setState({ c: txt, cInvalid: false })
  }

  dChanged(txt) {
    this.setState({ d: txt, dInvalid: false })
  }

  next() {
    const aInvalid = this.state.a ? false : true
    const bInvalid = this.state.b ? false : true
    const cInvalid = this.state.c ? false : true
    const dInvalid = this.state.d ? false : true
    const invalid = aInvalid || bInvalid || cInvalid || dInvalid
    this.setState({
      aInvalid: aInvalid,
      bInvalid: bInvalid,
      cInvalid: cInvalid,
      dInvalid: dInvalid
    })

    if (!invalid) {
      const answers = [
        { classification: 'A', description: this.state.a, correct: this.state.correct === 'A' },
        { classification: 'B', description: this.state.b, correct: this.state.correct === 'B' },
        { classification: 'C', description: this.state.c, correct: this.state.correct === 'C' },
        { classification: 'D', description: this.state.d, correct: this.state.correct === 'D' },
      ]
      this.props.notifyAnswersChanged(answers)
      setTimeout(() => {
        this.props.next()
      }, 300)
    }
  }

  correctChanged(classification) {
    this.setState({ correct: classification })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '90%' }}>
          <Text style={{ color: 'white', fontSize: 30 }}>Alternativas</Text>

          <TextInputLayout style={{ marginBottom: 20 }}
            hintColor={this.state.aInvalid ? 'red' : 'gray'}
            focusColor={this.state.aInvalid ? 'red' : 'white'}>
            <TextInput onChangeText={(txt) => this.aChanged(txt)}
              value={this.state.a}
              style={{ fontSize: 16, height: 40, color: 'white', width: 250 }}
              placeholder={'A'} />
          </TextInputLayout>

          <TextInputLayout style={{ marginBottom: 20 }}
            hintColor={this.state.bInvalid ? 'red' : 'gray'}
            focusColor={this.state.bInvalid ? 'red' : 'white'}>
            <TextInput onChangeText={(txt) => this.bChanged(txt)}
              value={this.state.b}
              style={{ fontSize: 16, height: 40, color: 'white', width: 250 }}
              placeholder={'B'} />
          </TextInputLayout>

          <TextInputLayout style={{ marginBottom: 20 }}
            hintColor={this.state.cInvalid ? 'red' : 'gray'}
            focusColor={this.state.cInvalid ? 'red' : 'white'}>
            <TextInput onChangeText={(txt) => this.cChanged(txt)}
              value={this.state.c}
              style={{ fontSize: 16, height: 40, color: 'white', width: 250 }}
              placeholder={'C'} />
          </TextInputLayout>

          <TextInputLayout style={{ marginBottom: 20 }}
            hintColor={this.state.dInvalid ? 'red' : 'gray'}
            focusColor={this.state.dInvalid ? 'red' : 'white'}>
            <TextInput onChangeText={(txt) => this.dChanged(txt)}
              value={this.state.d}
              style={{ fontSize: 16, height: 40, color: 'white', width: 250 }}
              placeholder={'D'} />
          </TextInputLayout>

          <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>Correta ?</Text>

          <View style={{ flexDirection: 'row' }}>
            <CustomRB currentValue={this.state.correct} value='A' label='A' onPress={this.correctChanged.bind(this)} />
            <CustomRB currentValue={this.state.correct} value='B' label='B' onPress={this.correctChanged.bind(this)} />
            <CustomRB currentValue={this.state.correct} value='C' label='C' onPress={this.correctChanged.bind(this)} />
            <CustomRB currentValue={this.state.correct} value='D' label='D' onPress={this.correctChanged.bind(this)} />
          </View>

        </View>
        <FooterStepper lastStep={true} next={() => this.next()} back={() => this.props.back()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({ question: state.question })

const mapDispatchToProps = (dispatch) => ({
  notifyAnswersChanged: answers => dispatch(answersChanged(answers))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswersQuestion)