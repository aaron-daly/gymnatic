import React from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './store/configure-store'
import Router from './Router'

const store = configureStore()

export default () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Router />
    </View>
  </Provider>
)