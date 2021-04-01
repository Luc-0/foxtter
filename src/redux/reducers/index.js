import auth from './auth';
import users from './users';
import UI from './UI';
import { combineReducers } from 'redux';

export default combineReducers({ auth, users, UI });
