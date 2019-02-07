import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../utils/styles';

export default class FooterStepper extends React.Component {

  constructor(props) {
    super(props)
    this.props = props
    this.state = { index: 1 }
  }

  render() {
    return (
      <View style={{
        backgroundColor: Colors.colorPrimary,
        flexDirection: 'row',
        width: '100%',
        padding: 8
      }}>

        <View style={{ width: '50%', alignItems: 'flex-start' }}>
          {
            !this.props.firstStep ?
              <TouchableOpacity onPress={() => { this.props.back() }} style={{ flexDirection: 'row' }} >
                <IconMaterial name="arrow-left" style={{ fontSize: 27, height: 30, color: 'white', }} />
                <Text style={{ marginLeft: 5, fontSize: 20, color: 'white' }}>{'VOLTAR'}</Text>
              </TouchableOpacity>
              : null
          }
        </View>

        <View style={{ width: '50%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => { this.props.next() }}>
            {
              this.props.lastStep ?
                <Text style={{ fontSize: 20, color: 'white' }}>CONCLUIR</Text>
                :
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, color: 'white' }}>PRÓXIMO</Text>
                  <IconMaterial name="arrow-right"
                    style={{ marginLeft: 5, fontSize: 27, height: 30, color: 'white', }} />
                </View>
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}