import {
  GET_ARTICLES,
  GET_COMMENTS,
  GET_TAGS,
} from "../actions/articles";

import {
  LOGIN_SUCCESS
} from '../actions/users';

const initialState = {
  articles: [{title: 'test'}],
  articlesCount: 0,
  tags: [],
  comments: [],
  loading: false,
  token: '',
  user: ''
};

const articles = (state = initialState, action) => {
  if (action.type === GET_ARTICLES) {
    return {
      ...state,
      articles: action.articles,
      articlesCount: action.articlesCount,
      loading: false
    };
  }
  if (action.type === GET_TAGS) {
    return {
      ...state,
      tags: action.tags,
    };
  }
  if (action.type === GET_COMMENTS) {
    return {
      ...state,
      comments: action.comments,
    };
  }
  if(action.type === 'SHOW_LOADING') {
    return {
      ...state,
      loading: true,
      articles: [],
    }
  }
  if(action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      token: action.token,
      user: action.user,
    }
  }
  return state;
};

export default articles;