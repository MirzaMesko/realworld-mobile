import React from 'react';
import { connect } from "react-redux";
import { View, TouchableOpacity, Text, Switch, StyleSheet, Platform } from 'react-native';
import { getArticles } from '../actions/articles';
import Article from '../components/Article';

function Home(props) {
  React.useEffect(() => {
    props.onGetArticles();
  })
    return (
        <View style={styles.container}>
            <Article articles={props.articles} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  });

  const mapStateToProps = (state) => ({
    articles: state.articles.articles
  });

  const mapDispatchToProps = dispatch => ({
    onGetArticles: (param) => dispatch(getArticles(param))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Home);