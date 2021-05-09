import React, {useState} from 'react';
import { connect } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { createArticle, editArticle } from '../actions/articles';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView
} from "react-native";

function CreateArticle(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');

    const reset = () => {
      setTitle('');
      setDescription('');
      setBody('');
      setTags('');
    }
  const create = () => {
     props.onCreateArticle(props.token, title, description, body, tags).then((response) => {
       props.navigation.navigate('SingleArticle', {article: response.data.article});
       reset();
     });
};

const edit = () => {
  props.onEditArticle(props.token, title, description, body, props.route.params.article.slug).then((response) => {
    props.navigation.navigate('SingleArticle', {article: response.data.article});
       reset();
  }) 
}

useFocusEffect(
  React.useCallback(() => {
    reset();
    if(props.route.params) {
      const { article } = props.route.params;
      setTitle(article.title);
      setDescription(article.description);
      setBody(article.body);
      //setTags(article.tagList);
    } 
  }, [props])
)

return (
  <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1}}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 10}>
  <View style={styles.container}>
      <Text style={{ marginBottom: '5%', fontSize: 30, color: 'black'}}>{props.route.params ? 'Edit article' : 'Create article'}</Text>
      <TextInput
      style={styles.input}
      onChangeText={setTitle}
      value={title}
      placeholder="Article title"
      textContentType="none"
    />
    <TextInput
      style={styles.input}
      onChangeText={setDescription}
      value={description}
      placeholder="What's this article about?"
      textContentType="none"
    />
    <TextInput
      style={styles.bodyInput}
      onChangeText={setBody}
      multiline = {true}
      numberOfLines = {5}
      value={body}
      placeholder="Write your article"
      textContentType="none"
    />
    <TextInput
      style={styles.input}
      onChangeText={setTags}
      value={tags}
      placeholder="Enter tags"
      textContentType="none"
    />
    <Button
    color="#5cb85c"
      title={props.route.params ? ' Edit ' : ' Create '}
      onPress={() => props.route.params ? edit() : create()}
    ></Button>
  </View>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
},
input: {
  width: "90%",
  padding: 20,
  marginBottom: 15,
  alignItems: "center",
  justifyContent: "center",
  borderColor: '#ccc',
  backgroundColor: "#fff",
  borderWidth: 2
},
bodyInput: {
  width: "90%",
  padding: 20,
  marginBottom: 15,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  borderColor: '#ccc',
  backgroundColor: "#fff",
  borderWidth: 2
}
});

const mapStateToProps = (state) => ({
  token: state.users.token,
});

const mapDispatchToProps = dispatch => ({
    onCreateArticle: (token, title, description, body, tags) => dispatch(createArticle(token, title, description, body, tags)),
    onEditArticle: (token, title, description, body, slug) => dispatch(editArticle(token, title, description, body, slug)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
