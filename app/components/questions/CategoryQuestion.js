import React from 'react'
import { Button, TextInput, Picker, View, Text } from 'react-native'
import FadeInOutView from '../FadeInOutView'
import { TextInputLayout } from 'rn-textinputlayout'
import { Colors } from '../../utils/styles'
import { connect } from 'react-redux'
import { categoryChanged, categoryAdded } from '../../stores/question/actions'
import FooterStepper from '../stepper/footerStepper'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMounted: false,
      custom: '',
      invalid: false
    }
    this.props = props
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  customChanged(newValue) {
    if (this.state.isMounted) {
      this.setState({ custom: newValue, invalid: (newValue ? false : true) })
    }
  }

  addCategory() {
    this.setState({ custom: 'teste' })
    this.props.notifyCategoryAdded(this.state.custom)
  }

  next() {
    if (!this.props.question.category.custom) {
      this.setState({ invalid: false })
      this.props.next()
    }
    else
      this.setState({ invalid: true })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '90%' }}>
          <Text style={{ color: 'white', fontSize: 30 }}>Qual a área de estudo ?</Text>
          <Picker
            selectedValue={this.props.question.category.selected}
            style={{ height: 50, width: 300, backgroundColor: 'white', marginTop: 50 }}
            onValueChange={(itemValue, itemIndex) => {
              this.props.notifyCategoryChanged(itemValue)
            }}>
            {this.props.question.categories.map(c => (<Picker.Item key={c} label={c} value={c} />))}
          </Picker>
          <FadeInOutView style={{ marginTop: 70 }} duration={150} visible={this.props.question.category.custom}>
            <TextInputLayout style={{ marginBottom: 20 }}
              hintColor={this.state.invalid ? 'red' : 'gray'}
              focusColor={this.state.invalid ? 'red' : 'white'}>
              <TextInput onChangeText={(txt) => this.customChanged(txt)}
                style={{ fontSize: 16, height: 40, color: 'white', width: 250 }}
                placeholder={'Informe um nome para a área'} />
            </TextInputLayout>
            <Button title='Adicionar'
              disabled={!this.state.custom}
              color={Colors.colorPrimary}
              onPress={() => this.addCategory()} />
          </FadeInOutView>
        </View>
        <FooterStepper firstStep={true}
          next={() => { this.next() }} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  question: state.question,
})

const mapDispatchToProps = dispatch => ({
  notifyCategoryChanged: newCategory => dispatch(categoryChanged(newCategory)),
  notifyCategoryAdded: newCategory => dispatch(categoryAdded(newCategory)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)