import * as firebase from 'firebase'
import config from '../constants/config'

firebase.initializeApp(config.firebase)

const database = firebase.database().ref()
const api = firebase.database().ref()
const auth     = firebase.auth()

export {
  database,
  api,
  auth
}