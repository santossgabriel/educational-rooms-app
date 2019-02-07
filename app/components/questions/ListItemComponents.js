import React from 'react'
import { TouchableHighlight, View, Dimensions, Text } from 'react-native'

import { Colors } from '../../utils/styles';

export const QuestionListItem = (props) => {
  const item = props.item
  const windowWidth = Dimensions.get('window').width
  const descWidth = windowWidth - 10 - 70
  return item ? (
    <TouchableHighlight underlayColor="#8888" onPress={() => { props.onPress ? props.onPress(item) : null }}>
      <View margin={5} marginTop={8} borderRadius={5} height={65}
        style={{ overflow: 'hidden', backgroundColor: 'white', flexDirection: 'row' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: 70, backgroundColor: Colors.colorPrimary }}>
          <Text style={{ color: 'white', fontSize: 20 }} >{item.appId}</Text>
        </View>
        <View style={{ paddingTop: 5, flexDirection: 'column', width: descWidth }}>
          <Text style={{ textAlign: 'center', height: 40 }}>{item.description}</Text>
          <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
            <Text style={{ paddingLeft: 20, width: '50%', color: Colors.colorPrimary }}>{item.category}</Text>
            <Text style={{ width: '50%', textAlign: 'right', color: Colors.colorPrimary }}>{`${item.points} ${item.points > 1 ? ' Pontos' : 'Ponto'}`}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  ) : null
}