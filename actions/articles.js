const axios = require('axios');
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_TAGS = 'GET_TAGS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const SHOW_LOADING = 'SHOW_LOADING';

function getArticlesSuccess(articles, articlesCount) {
    return {
        type: GET_ARTICLES,
        articles,
        articlesCount
    }
};

function getTagsSuccess(tags) {
  return {
      type: GET_TAGS,
      tags
  }
};

function getCommentsSuccess(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

function setLoading() {
  return {
    type: SHOW_LOADING
  }
}


export function getArticles(param, offset) {
  setLoading();
  if(!offset) {
    offset = 0
  }
  let url = `https://conduit.productionready.io/api/articles?limit=10&offset=${offset}&${param}`;
  if (!param) {
    url = `https://conduit.productionready.io/api/articles?limit=10&offset=${offset}`
  }
    return (dispatch) =>
      axios
        .get(url)
        .then((response) => {
          if(!response.data.articles) {
            dispatch(getArticlesSuccess([response.data.article]));
          } else {
            dispatch(getArticlesSuccess(response.data.articles, response.data.articlesCount));
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
}

export function getTags() {
    let url = `https://conduit.productionready.io/api/tags`;
    return (dispatch) =>
      axios
        .get(url)
        .then((response) => {
          dispatch(getTagsSuccess(response.data.tags));
        })
        .catch((error) => {
          console.log(error);
        });
}

export function getFeed(token) {
  setLoading();
  let url = `https://conduit.productionready.io/api/articles/feed`;
  const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) =>
      axios
        .get(url, { headers })
        .then((response) => {
          dispatch(getArticlesSuccess(response.data.articles, response.data.articlesCount));
        })
        .catch((error) => {
          console.log(error);
        });
}

export function getComments(token, slug) {
  let url = 'https://conduit.productionready.io/api/articles/' + slug + '/comments';
    return (dispatch) =>
      axios
        .get(url)
        .then((response) => {
          dispatch(getCommentsSuccess(response.data.comments));
          return response
        })
        .catch((error) => {
          console.log(error);
        });
}