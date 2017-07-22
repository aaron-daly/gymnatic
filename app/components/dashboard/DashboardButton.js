import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  text: {
    flex: 1,
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '500'
  }
})

export default ({ iconName, text, color = 'white', backgroundColor = 'grey', onPress }) => (
  <TouchableOpacity
    style={[styles.container, {backgroundColor}]}
    activeOpacity={0.67}
    onPress={onPress}>
    <MaterialIcon
      name={iconName}
      color={color}
      size={20}
    />
    <Text style={[styles.text, {color}]}>
      {text}
    </Text>
    <SimpleLineIcon
      name={'arrow-right'}
      color={color}
      size={16}
    />
  </TouchableOpacity>
)
