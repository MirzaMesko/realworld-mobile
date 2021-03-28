import React from "react";
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import Article from './Article';
import { getArticles } from '../actions/articles';

const ArticlesList = (props) => {
  const [listOfArticles, setListOfArticles] = React.useState([]);
    
    React.useEffect(() => {
        if(props.navigation.state.params !== undefined) {
          setListOfArticles(props.navigation.state.params.articles)
        } else if (props.articles) {
          setListOfArticles(props.articles)
        } else {
            props.onGetArticles().then((response) => {
              setListOfArticles(response)
            })
        }
    }, [props.articles])

    if (!listOfArticles.length) {
        return (
          <View style={styles.container}>
              <Text >Loading...</Text>
          </View>
        ) 
        
    }
    return (
        <Article articles={listOfArticles} />
      );
}

ArticlesList['navigationOptions'] = screenProps => ({
  title: `${screenProps.navigation.state.params.title}`
})

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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ArticlesList));