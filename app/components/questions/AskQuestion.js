import React from 'react'
import { TextInput, View, Text } from 'react-native'
import { TextInputLayout } from 'rn-textinputlayout'
import { askChanged } from '../../stores/question/actions'
import { connect } from 'react-redux'
import FooterStepper from '../stepper/footerStepper'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = { txt: props.question.ask, isMounted: false }
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  textChanged(txt) {
    if (this.state.isMounted)
      this.setState({ txt: txt, invalid: false })
  }

  next() {
    if (this.state.txt) {
      this.setState({ invalid: false })
      this.props.notifyAskChanged(this.state.txt)
      this.props.next()
    }
    else
      this.setState({ invalid: true })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '90%' }}>
          <Text style={{ color: 'white', fontSize: 30 }}>Qual a pergunta ?</Text>
          <TextInputLayout style={{ marginBottom: 20 }}
            hintColor={this.state.invalid ? 'red' : 'gray'}
            focusColor={this.state.invalid ? 'red' : 'white'}>
            <TextInput onChangeText={(txt) => this.textChanged(txt)}
              value={this.state.txt}
              style={{ fontSize: 16, height: 40, color: 'white', width: 250 }}
              placeholder={'Informe a pergunta'} />
          </TextInputLayout>
        </View>
        <FooterStepper next={() => this.next()} back={() => this.props.back()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({ question: state.question })

const mapDispatchToProps = (dispatch) => ({
  notifyAskChanged: newAsk => dispatch(askChanged(newAsk))
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)