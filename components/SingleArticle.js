import React from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { getArticles, getComments, addComment, deleteComment } from "../actions/articles";

const SingleArticle = (props) => {
  const [article, setArticle] = React.useState({});
  const [commentBody, setCommentBody] = React.useState("");

  const addComment = () => {
    props.onAddComment(props.token, article.slug, commentBody);
    setCommentBody("");
  };

  const deleteComment = (id) => {
    props.onDeleteComment(props.token, article.slug, id)
  }

  React.useEffect(() => {
    if (props.navigation.state.params !== undefined) {
        props.onGetComments(props.navigation.state.params.article.slug).then((response) => {
            setArticle(props.navigation.state.params.article);
        });
      
      
    }
  }, [props.navigation.state.params]);

  if (!article.title) {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 40, margin: 10 }}>{article.title}</Text>
      {article.tagList ? (
        <View
          style={{
            flexDirection: "row",
            color: "#aaa",
          }}
        >
          {article.tagList.map((tag) => {
            return (
              <Text
                key={tag}
                style={{
                  borderWidth: 1,
                  padding: 5,
                  color: "#aaa",
                  margin: 10,
                  borderColor: "#aaa",
                  borderRadius: 5,
                }}
              >
                {tag}
              </Text>
            );
          })}
        </View>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          margin: 10,
        }}
      >
        <Image
          source={{
            uri:
              article.author && article.author.image !== ""
                ? article.author.image
                : "https://reactnative.dev/img/tiny_logo.png",
          }}
          style={{ width: 25, height: 25, resizeMode: "stretch" }}
        />
        <Text
          style={{
            color: "#aaa",
            marginLeft: 10,
          }}
        >
          {article.author ? article.author.username : null} -{" "}
        </Text>
        <Text
          style={{
            color: "#aaa",
          }}
        >
          {new Date(article.createdAt).toDateString()}
        </Text>
      </View>
      <Text style={{ fontSize: 30, margin: 20 }}>{article.body}</Text>
      <Text style={{ fontSize: 15, marginLeft: 30 }}>Comments</Text>
      {props.comments
        ? props.comments.map((comment) => {
            return (
              <View
                style={{ margin: 30, borderWidth: 1, borderColor: "#aaa" }}
                key={comment.id}
              >
                <Text style={{ minHeight: 100, padding: 10 }}>
                  {comment.body}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    borderTopWidth: 1,
                    borderColor: "#aaa",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: comment.author.image }}
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: "stretch",
                        marginRight: 10,
                      }}
                    />
                    <Text style={{ color: "#aaa" }}>
                      {comment.author.username}
                    </Text>
                    <Text
                      style={{
                        color: "#aaa",
                        marginLeft: 10,
                      }}
                    >
                      {new Date(comment.createdAt).toDateString()}
                    </Text>
                  </View>
                  {comment.author.username === props.user ? (
                    <TouchableOpacity onPress={() => deleteComment(comment.id)}><Ionicons color="#aaa"
                    size={20}
                    name={Platform.OS === "ios" ? "ios-trash-outline" : "md-trash"}></Ionicons></TouchableOpacity>
                  ) : null}
                </View>
              </View>
            );
          })
        : null}

      <TextInput
        style={styles.input}
        placeholder="Write a comment ..."
        onChangeText={setCommentBody}
        value={commentBody}
        textContentType="none"
      />

      <View style={{ width: "50%", marginLeft: "25%", marginBottom: 15 }}>
        <Button title="post comment" color="#5cb85c" onPress={addComment} />
      </View>
    </ScrollView>
  );
};

SingleArticle["navigationOptions"] = (screenProps) => ({
  title: `${screenProps.navigation.state.params.title}`,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    padding: 20,
    margin: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#aaa",
    borderWidth: 1,
    minHeight: 100,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.currentUser.username,
  comments: state.articles.comments,
  token: state.users.token,
});

const mapDispatchToProps = (dispatch) => ({
  onGetArticles: (param, offset) => dispatch(getArticles(param, offset)),
  onGetComments: (slug) => dispatch(getComments(slug)),
  onAddComment: (token, slug, body) => dispatch(addComment(token, slug, body)),
  onDeleteComment: (token, slug, id) => dispatch(deleteComment(token, slug, id)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(SingleArticle)
);
