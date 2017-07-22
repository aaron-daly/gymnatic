import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as routerActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native'

import { register, dismissError } from '../../actions/AuthActions'
import * as strings from '../../constants/strings/auth'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 38,
    fontFamily: 'DancingScript-Bold',
    color: colors.white,
    opacity: 0.95,
    alignSelf: 'center',
    padding: 50,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(38,84,124, 0.95)',
    paddingVertical: 25
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'space-between'
  },
  formContainer: {
    justifyContent: 'center',
    paddingHorizontal: 50
  },
  textInputContainer: {
    height: 45,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderBottomColor: colors.darknavy,
    marginBottom: 15
  },
  textInputLabel: {
    color: colors.white,
    opacity: 0.87
  },
  textInput: {
    height: 45,
    fontSize: 14.5,
    color: colors.lightgrey
  },
  button: {
    height: 45,
    marginTop: 15,
    backgroundColor: colors.green,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 14.5,
    color: colors.white
  },
  footer: {
    fontSize: 14.5,
    alignSelf: 'center',
    color: colors.lightgrey,
    paddingBottom: 15
  }
})

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      displayName: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props
    if (!prevProps.error && this.props.error) {
      this._handleRegistrationError(error)
    }
  }

  _handleRegistrationError = (error) => {
    Alert.alert(
      strings.REGISTRATION_FAILED_ALERT,
      error.message,
      [{
        text: strings.ALERT_DISMISS,
        onPress: this.props.actions.dismissError
      }]
    )
  }

  _validateProfileCreds = () => {
    const { displayName } = this.state
    if (displayName === null ||
        displayName === undefined ||
        displayName.length < 2 ||
        displayName.length > 24) {
      this._handleRegistrationError({
        message: strings.INVALID_DISPLAY_NAME_ERROR
      })
      return false
    }
    return true
  }

  _onRegisterPress = () => {
    if (this._validateProfileCreds()) {
      const { email, password, displayName } = this.state
      this.props.actions.register(email, password, { displayName })
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView scrollEnabled={false}>
        <Image
          style={styles.background}
          source={require('../../../resources/img/register_bg.jpeg')}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>{strings.REGISTER_BANNER}</Text>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.formContainer}>
                <View style={styles.textInputContainer}>
                  <TextInput
                    ref={name => this._nameInput = name}
                    style={styles.textInput}
                    selectionColor={colors.white}
                    placeholder={strings.NAME_PLACEHOLDER}
                    autoCapitalize={'none'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => this._passwordInput.focus()}
                    onChangeText={displayName => this.setState({ displayName })}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    selectionColor={colors.white}
                    placeholder={strings.EMAIL_PLACEHOLDER}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => this._nameInput.focus()}
                    onChangeText={email => this.setState({ email })}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    ref={input => this._passwordInput = input}
                    style={styles.textInput}
                    selectionColor={colors.white}
                    placeholder={strings.PASSWORD_PLACEHOLDER}
                    autoCapitalize={'none'}
                    returnKeyType={'go'}
                    secureTextEntry={true}
                    onSubmitEditing={this._onRegisterPress}
                    onChangeText={password => this.setState({password})}
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.66}
                  onPress={this._onRegisterPress}>
                  <Text style={styles.buttonText}>
                    {strings.REGISTER_BUTTON}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={routerActions.pop}>
                <Text style={styles.footer}>
                  {strings.BACK_TO_LOGIN_BUTTON}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </KeyboardAwareScrollView>
    )
  }

}

Register.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object
}

const mapStateToProps = (state) => ({
  ...state.user
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    register: (email, password, profileCreds) => dispatch(register(email, password, profileCreds)),
    dismissError: () => dispatch(dismissError())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
