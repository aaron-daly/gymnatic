import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  headerContainer: {
    height: 45,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.06)'
  },
  titleIcon: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginRight: 15
  },
  titleText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)'
  },
  contentContainer: {
    backgroundColor: colors.white
  }
})

export default ({ titleIcon, titleText, actionButton, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {
          titleIcon &&
          <Text style={styles.titleIcon}>
            {titleIcon}
          </Text>
        }
        <Text style={styles.titleText}>
          {titleText}
        </Text>
        {actionButton}
      </View>
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  )
}