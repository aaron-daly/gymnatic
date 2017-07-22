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
  Alert,
  Image,
  Dimensions
} from 'react-native'

import { login, dismissError } from '../../actions/AuthActions'
import * as routes from '../../constants/routes'
import * as strings from '../../constants/strings/auth'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 150,
    width: 120
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(38,84,124, 0.95)',
    paddingVertical: 25
  },
  contentContainer: {
    flex: 1,
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

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: 'aaron@gymnatic.com',
      password: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.error && this.props.error) {
      Alert.alert(
        strings.LOGIN_FAILED_ALERT,
        this.props.error.message,
        [
          {
            text: strings.ALERT_DISMISS,
            onPress: this.props.actions.dismissError
          }
        ]
      )
    }
  }

  _onPressLogIn = () => {
    const { email, password } = this.state
    this.props.actions.login(email, password)
  }

  render() {
    return (
      <KeyboardAwareScrollView scrollEnabled={false}>
        <Image
          style={styles.background}
          resizeMode={'cover'}
          source={require('../../../resources/img/login_bg.jpeg')}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../../resources/logo/gymnatic_logo@3x.png')}
            />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  selectionColor={colors.white}
                  placeholder={strings.EMAIL_PLACEHOLDER}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this._passwordInput.focus()}
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
                  onSubmitEditing={this._onPressLogIn}
                  onChangeText={password => this.setState({password})}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.66}
                onPress={this._onPressLogIn}>
                <Text style={styles.buttonText}>
                  {strings.LOGIN_BUTTON}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={routerActions[routes.REGISTER]}>
              <Text style={styles.footer}>
                {strings.NOT_REGISTERED_BUTTON}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </Image>
      </KeyboardAwareScrollView>
    )
  }
}

Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object
}

const mapStateToProps = (state) => ({
  ...state.user
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    login: (email, password) => dispatch(login(email, password)),
    dismissError: () => dispatch(dismissError())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
