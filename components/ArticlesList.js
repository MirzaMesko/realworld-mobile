import React from "react";
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text
} from "react-native";
import Article from './Article';
import { getArticles } from '../actions/articles';

const ArticlesList = (props) => {
  const [listOfArticles, setListOfArticles] = React.useState(0);

    React.useEffect(() => {
        if(props.route) {
          setListOfArticles(props.route.params.articles)
          props.navigation.setOptions({
            title: `${props.route.params.title}`
          })
          
        } else if (props.articles) {
          setListOfArticles(props.articles)
        } else {
            props.onGetArticles().then((response) => {
              setListOfArticles(response)
            })
        }
    }, [props])

    if (!listOfArticles) {
        return (
          <View style={styles.container}>
              <ActivityIndicator size={40} color="#5cb85c"/>
          </View>
        ) 
    }
    if(!listOfArticles.length) {
      return (
        <View style={styles.container}>
              <Text>There are no articles here ... Yet.</Text>
          </View>
      )
    }
    return (
        <Article articles={listOfArticles} />
      );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
});

const mapStateToProps = (state) => ({
    articlesCount: state.articles.articlesCount
  });

  const mapDispatchToProps = dispatch => ({
    onGetArticles: (param, offset) => dispatch(getArticles(param, offset)),
  })

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);