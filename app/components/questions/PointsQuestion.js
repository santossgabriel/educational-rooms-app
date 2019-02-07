import React from 'react'
import { View, Text, Slider } from 'react-native'
import { pointsChanged } from '../../stores/question/actions'
import { connect } from 'react-redux'
import FooterStepper from '../stepper/footerStepper'

class Points extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '90%' }}>
          <Text style={{ color: 'white', fontSize: 30 }}>Qual a pontuação ?</Text>
          <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>
            {`${this.props.question.points} ${this.props.question.points > 1 ? 'pontos' : 'ponto'}`}
          </Text>
          <Slider minimumValue={1} maximumValue={10}
            width={200}
            step={1}
            value={this.props.question.points}
            onValueChange={(points) => this.props.notifyPointsChanged(points)} />
        </View>
        <FooterStepper next={() => this.props.next()} back={() => this.props.back()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({ question: state.question })

const mapDispatchToProps = (dispatch) => ({
  notifyPointsChanged: points => dispatch(pointsChanged(points))
})

export default connect(mapStateToProps, mapDispatchToProps)(Points)