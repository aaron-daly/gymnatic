import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import _deep from 'lodash-deep'
_.mixin(_deep)
import {
  StyleSheet,
   TextInput,
   View
 } from 'react-native'

import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darknavy,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.navy
  },
  icon: {
    fontSize: 18.5,
    width: 30,
    color: colors.white
  },
  textInput: {
    flex: 1,
    marginRight: 30,
    textAlign: 'center',
    height: 50,
    backgroundColor: 'transparent',
    color: colors.white
  }
})

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  _onChangeText = (input) => {
    this.setState({ input })
    const { handleResults } = this.props
    const searchResults = this._search(input)
    return handleResults(searchResults)
  }

  _search = (input) => {
    const { data } = this.props
    if (input === '') {
      switch (typeof data) {
        case 'object':
          return Object.values(data)
        case 'array':
        default:
          return data
      }
    }
    return this._deepSearch(input, data)
  }

  _deepSearch = (input, data) => {
    let searchResults = []
    _.deepMapValues(data, (value, path) => {
      if (_.toLower(value).includes(_.toLower(input))) {
        const rootPath = path.substring(0, path.indexOf('.')) || '0'
        const rootPathData = data[rootPath]
        if (searchResults.indexOf(rootPathData) < 0) {
          searchResults.push(rootPathData)
        }
      }
    })
    return searchResults
  }

  render() {
    const {
      style,
      placeholder,
      selectionColor
    } = this.props
    const textInputStyles = [styles.textInput, style]
    return (
      <View style={styles.container}>
        <Icon
          name={'magnifier'}
          style={styles.icon}
        />
        <TextInput
          ref={ref => this.textInput = ref}
          style={textInputStyles}
          value={this.state.value}
          onChangeText={(value) => this._onChangeText(value)}
          placeholder={placeholder}
          placeholderTextColor={colors.blue}
          selectionColor={selectionColor}
        />
      </View>
    )
  }
}

SearchBar.defaultProps = {
  placeholder: 'Search',
  selectionColor: colors.white
}

SearchBar.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  handleResults: PropTypes.func.isRequired
}

export default SearchBar
