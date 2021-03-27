import {
  GET_ARTICLES,
  GET_COMMENTS,
  GET_TAGS,
} from "../actions/articles";

const initialState = {
  articles: [{title: 'test'}],
  articlesCount: 0,
  tags: [],
  comments: [],
  loading: false,
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
  return state;
};

export default articles;