import auth from './auth';
import users from './users';
import { combineReducers } from 'redux';

export default combineReducers({ auth, users });
