import React, { PropTypes } from 'react'
import { map } from 'lodash'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native'

import { Avatar } from '../common'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0,0,0,0.20)',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 0
    },
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 15
  },
  headerTextContainer: {
    flex: 1
  },
  titleText: {
    fontSize: 16,
    lineHeight: 26,
    opacity: 0.87
  },
  subtitleText: {
    fontSize: 12,
    color: 'black',
    opacity: 0.6,
    lineHeight: 18,
    width: 300
  },
  infoContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.06)'
  },
  infoAttributeContainer: {
    marginRight: 30
  },
  infoLabelText: {
    fontSize: 12,
    color: 'black',
    opacity: 0.6
  },
  infoValueText: {
    marginTop: 3,
    fontSize: 14,
    color: 'black'
  },
  infoButtonIcon: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
    opacity: 0.4
  }
})

const InfoAttribute = ({ label, value, color }) => {
  return (
    <View style={styles.infoAttributeContainer}>
      <Text style={styles.infoLabelText}>
        {label}
      </Text>
      <Text style={[styles.infoValueText, { color: color }]}>
        {value}
      </Text>
    </View>
  )
}

const InfoCard = ({ title, description, avatarSource, attributes, actionButtons, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.67}>
    <View style={styles.headerContainer}>
      {avatarSource &&
        <Avatar
          source={avatarSource}
        />
      }
      <View style={styles.headerTextContainer}>
        <Text style={styles.titleText}>
          {title}
        </Text>
        {description &&
          <Text style={styles.subtitleText}>
            {description}
          </Text>
        }
      </View>
    </View>
    <View style={styles.infoContainer}>
      {map(attributes, (attribute, i) =>
        <InfoAttribute
          key={i}
          {...attribute}
        />
      )}
      {map(actionButtons, (ActionButton, i) =>
        <ActionButton
          key={i}
        />
      )}
    </View>
  </TouchableOpacity>
)

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  avatarSource: PropTypes.object,
  attributes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string
  }).isRequired).isRequired,
  actionButtons: PropTypes.arrayOf(PropTypes.node.isRequired),
  onPress: PropTypes.func
}

export default InfoCard