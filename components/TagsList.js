import React from 'react';
import { connect } from "react-redux";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { getTags, getArticles } from '../actions/articles';

function TagsList(props) {
  React.useEffect(() => {
      props.onGetTags();
  }, [])

  const articlesByTag = (tag) => {
    props.onGetArticles(`tag=${tag}`).then((response) => {
      props.navigation.navigate("Articles", { articles: response, title: `#${tag}`, });
    });
  }

  if (!props.tags.length) {
    return (
      <View style={styles.container}>
          <ActivityIndicator size={40} color="#5cb85c"/>
      </View>
    ) 
    
}
 
return (
    <ScrollView style={styles.list}>
       {props.tags.map(tag => {
            return (
                <TouchableOpacity onPress={() => articlesByTag(tag)} key={tag}>
                        <Text key={tag} style={styles.singleTag}>#{tag}</Text>
                </TouchableOpacity>
            )
        })}
    </ScrollView>
  ) 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    list: {
        flex: 1,
      backgroundColor: "#fff",
      padding: 35
    },
    singleTag: {
        color: '#5cb85c',
        fontWeight: 'bold',
        paddingBottom: 15
    }
  });

const mapStateToProps = (state) => ({
    tags: state.articles.tags
  });

  const mapDispatchToProps = dispatch => ({
    onGetTags: () => dispatch(getTags()),
    onGetArticles: (param, offset) => dispatch(getArticles(param, offset)),
  })

export default connect(mapStateToProps, mapDispatchToProps)(TagsList);