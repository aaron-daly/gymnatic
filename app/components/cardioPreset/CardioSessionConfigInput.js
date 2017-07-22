import React, { PropTypes } from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    paddingVertical: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelText: {
    fontSize: 14,
    flex: 1,
    color: 'black',
    opacity: 0.6
  },
  textInput: {
    width: 45,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
    opacity: 0.6
  },
  infoIcon: {
    marginLeft: 15,
    fontSize: 14,
    color: 'black',
    opacity: 0.6
  },
  emptySectionText: {
    fontSize: 12,
    padding: 30,
    alignSelf: 'center',
    opacity: 0.6

  }
})

const alertInfo = info => Alert.alert('Info', info, [{ text: 'Close' }])

const CardioSessionConfigInput = ({
   label = '',
   keyboardType = 'numeric',
   maxLength = 3,
   defaultValue = '',
   info = '',
   onValueChange
 }) => (
  <View style={styles.container}>
    <Text style={styles.labelText}>
      {label}
    </Text>
    <TextInput
      style={styles.textInput}
      keyboardType={keyboardType}
      maxLength={maxLength}
      defaultValue={defaultValue}
      onChangeText={onValueChange}
    />
    <Icon
      name={'info'}
      style={styles.infoIcon}
      onPress={() => alertInfo(info)}
    />
  </View>
)

CardioSessionConfigInput.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  info: PropTypes.string
}

export default CardioSessionConfigInput