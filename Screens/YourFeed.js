import React from 'react';
import { connect } from "react-redux";
import { View } from 'react-native';
import { getFeed } from '../actions/articles';
import ArticlesList from '../components/ArticlesList';

function YourFeed(props) {
    const [feedArticles, setFeedArticles] = React.useState([]);
  React.useEffect(() => {
    props.onGetFeed(props.token).then((response) => {
        setFeedArticles(response)
    })
  }, [])
    return (
        <View style={{flex: 1}}>
            <ArticlesList articles={feedArticles} />
        </View>
    )
}

  const mapStateToProps = (state) => ({
    token: state.users.token
  });

  const mapDispatchToProps = dispatch => ({
    onGetFeed: (token) => dispatch(getFeed(token)),
  })

export default connect(mapStateToProps, mapDispatchToProps)(YourFeed);