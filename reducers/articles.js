import {
  GET_ARTICLES,
  GET_USER_FEED,
  GET_COMMENTS,
  GET_TAGS,
  ADD_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_ARTICLE_SUCCESS
} from "../actions/articles";

const initialState = {
  articles: [],
  articlesCount: 0,
  userFeed: [],
  feedArticlesCount: 0,
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
  if (action.type === GET_USER_FEED) {
    return {
      ...state,
      userFeed: action.articles,
      feedArticlesCount: action.articlesCount,
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
  if (action.type === DELETE_ARTICLE_SUCCESS) {
    return {
      ...state,
      articles: state.articles.filter(
        (article) => article.slug !== action.slug
      ),
    };
  }
  return state;
};

export default articles;