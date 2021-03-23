import { combineReducers } from 'redux';
import users from './users';
import articles from './articles';

export default combineReducers({
    users,
    articles
});