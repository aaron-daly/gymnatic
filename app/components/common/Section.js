import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 12.5,
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.06)'
  },
  titleIcon: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    marginRight: 7.5
  },
  titleText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)'
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.12)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.12)'
  }
})

export default ({ contentContainerStyle, titleIcon, titleText, actionButtons = [], children }) => {
  let renderableActionButtons = actionButtons.map((item, i) => ({ key: i, ...item }))
  return (
    <View>
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
        {renderableActionButtons}
      </View>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </View>
  )
}