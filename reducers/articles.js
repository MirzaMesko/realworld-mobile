import {
  GET_ARTICLES,
  GET_COMMENTS,
  GET_TAGS,
  ADD_COMMENT,
  DELETE_COMMENT_SUCCESS
} from "../actions/articles";

const initialState = {
  articles: [],
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
  if (action.type === ADD_COMMENT) {
    return {
      ...state,
      comments: state.comments.concat(action.comment),
    };
  }
  if (action.type === DELETE_COMMENT_SUCCESS) {
    return {
      ...state,
      comments: state.comments.filter((comment) => comment.id !== action.id),
    };
  }
  return state;
};

export default articles;