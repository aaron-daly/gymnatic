import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as routerActions } from 'react-native-router-flux'

import {
  ViewContainer,
  LoadingDialog,
  ErrorDialog,
  InfoDialog
} from '../../components/common'
import CardioPresetList from '../../components/cardioPresetList/CardioPresetList'
import { fetchCardioPresets } from '../../actions/CardioPresetsActions'
import * as strings from '../../constants/strings/cardio'
import * as routes from '../../constants/routes'

class CardioPresets extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { isFetching, cardioPresets } = this.props.cardioPresets
    if (!isFetching && !Object.keys(cardioPresets).length) {
      this.props.actions.fetchCardioPresets()
    }
  }

  _onCardioPresetPress = (_id) => {
    routerActions[routes.CARDIO_WORKOUT]({ _id })
  }

  render() {
    const { isFetching, cardioPresets, error } = this.props.cardioPresets

    if (isFetching) {
      return <LoadingDialog/>
    }

    if (error) {
      return <ErrorDialog text={error.message} />
    }

    if (!Object.keys(cardioPresets).length) {
      return <InfoDialog text={strings.NO_CARDIO_PRESETS} />
    }

    return (
      <ViewContainer>
        <CardioPresetList
          cardioPresets={Object.values(cardioPresets)}
          onCardioPresetPress={this._onCardioPresetPress}
        />
      </ViewContainer>
    )
  }
}

CardioPresets.propTypes = {
  cardioPresets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    cardioPresets: PropTypes.object.isRequired,
    error: PropTypes.object
  }).isRequired
}

const mapStateToProps = (state) => ({
  cardioPresets: state.cardioPresets
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchCardioPresets: () => dispatch(fetchCardioPresets())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardioPresets)