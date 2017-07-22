import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { SectionCard, EmptySectionText } from '../../components/common'
import CardioSessionBotConfig from './CardioSessionBotConfig'
import { addNewBot } from '../../actions/CardioSessionActions'
import * as strings from '../../constants/strings/cardio'
import * as icons from '../../constants/icons'

class CardioSessionBotConfigs extends Component {

  render() {
    const ActionButton = (
      <Icon
        style={{ padding: 15 }}
        name={icons.PLUS}
        size={14}
        color={'rgba(0,0,0,0.5)'}
        onPress={this.props.addNewBot}
      />
    )

    return (
      <SectionCard
        titleIcon={<Icon name={icons.GHOST} size={14} />}
        titleText={strings.BOTS_SECTION_TITLE}
        actionButton={ActionButton}>
        {map(this.props.bots, botKey =>
          <CardioSessionBotConfig
            key={botKey}
            botKey={botKey}
          />
        )}
        {!this.props.bots.length &&
          <EmptySectionText
            message={'No bots created.'}
          />
        }
      </SectionCard>
    )
  }
}

const mapStateToProps = (state) => ({
  bots: state.cardioSession.bots
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addNewBot: () => dispatch(addNewBot(ownProps._cardioPresetId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardioSessionBotConfigs)