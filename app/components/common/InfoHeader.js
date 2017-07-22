import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.navy,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 25,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowColor: colors.navy,
    shadowOpacity: 0.5
  },
  infoItemContainer: {
    flex: 1,
    alignItems: 'center'
  },
  infoLabelText: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.6
  },
  infoValueText: {
    marginTop: 6,
    fontSize: 16,
    color: colors.white,
    fontWeight: '500'
  },
  infoButtonIcon: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
    opacity: 0.4
  }
})


const InfoItem = ({ label, value, color }) => {
  return (
    <View style={styles.infoItemContainer}>
      <Text style={styles.infoLabelText}>{label}</Text>
      <Text style={[styles.infoValueText, { color: color }]}>{value}</Text>
    </View>
  )
}

export default ({ info }) => {
  return (
    <View style={styles.container}>
      { info.map((infoItem, i) => <InfoItem key={i} {...infoItem} />)}
    </View>
  )
}
