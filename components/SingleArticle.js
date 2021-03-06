import React from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  getArticles,
  getComments,
  addComment,
  deleteComment,
  favoriteArticle,
  unfavoriteArticle,
  deleteArticle
} from "../actions/articles";
import { followUser, unfollowUser, getProfile } from "../actions/users";

const SingleArticle = (props) => {
  const [article, setArticle] = React.useState({});
  const [commentBody, setCommentBody] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [articleAuthor, setArticleAuthor] = React.useState([]);

  const addComment = () => {
    props
      .onAddComment(props.token, article.slug, commentBody)
      .then((response) => {
        comments.unshift(response.data.comment);
        setCommentBody("");
      });
  };

  const deleteComment = (id) => {
    props.onDeleteComment(props.token, article.slug, id).then(() => {
      let afterDelete = comments.filter((comment) => comment.id !== id);
      setComments(afterDelete);
    });
  };

  const favoriteArticle = (slug) => {
    props.onFavoriteArticle(props.token, slug).then((response) => {
      setArticle(response.data.article);
    });
  };

  const unfavoriteArticle = (slug) => {
    props.onUnfavoriteArticle(props.token, slug).then((response) => {
      setArticle(response.data.article);
    });
  };

  const followUser = (username) => {
    props.onFollowUser(props.token, username).then((response) => {
      setArticleAuthor(response.data.profile);
    });
  };

  const unfollowUser = (username) => {
    props.onUnfollowUser(props.token, username).then((response) => {
      setArticleAuthor(response.data.profile);
    });
  };

  const deleteArticle = () => {
    props.onDeleteArticle(props.token, article.slug).then(() => {
      props.onGetArticles(`author=${articleAuthor.username}`).then((response) => {
        props.navigation.navigate("Articles", {articles: response, title: `${articleAuthor.username}'s Articles`});
      });
    })
  }

  React.useEffect(() => {
    if (props.route) {
      const { username } = props.route.params.article.author;
      props
        .onGetComments(props.route.params.article.slug)
        .then((response) => {
          setComments(response.data.comments);
          setArticle(props.route.params.article);
        });
      props.onGetProfile(props.token, username).then((response) => {
        setArticleAuthor(response.data.profile);
      });
    }
  }, [props.route.params]);

  if (!article.title) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={40} color="#5cb85c"/>
      </View>
    );
  }

  let icons = (
    <TouchableOpacity
    style={{
      margin: 10,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={() =>
      article.favorited !== true
        ? favoriteArticle(article.slug)
        : unfavoriteArticle(article.slug)
    }
  >
    <View style={{ flexDirection: "row" }}>
      <Ionicons
        name="heart-outline"
        size={30}
        color={article.favorited ? "#5cb85c" : "#aaa"}
      />
      <Text
        style={{
          color: "#aaa",
          fontSize: 20,
        }}
      >
        {article.favoritesCount}
      </Text>
    </View>
  </TouchableOpacity>
  )

  if (article.author.username === props.user) {
    icons = (
      <View style={{ flex: 1}}>
          <TouchableOpacity
    style={{
      margin: 10,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={() => deleteArticle()}
  >
      <Ionicons
        name="md-trash"
        size={30}
        color="#aaa"
      />
  </TouchableOpacity>
  <TouchableOpacity
    style={{
      margin: 10,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={() => props.navigation.navigate('Edit Article', {article: article})}
  >
      <Ionicons
        name="create-outline"
        size={30}
        color="#aaa"
      />
  </TouchableOpacity>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 40, margin: 10, flex: 5 }}>
          {article.title}
        </Text>
        {icons}
      </View>
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
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile', {user: `${article.author.username}`})}>
        <Text
          style={{
            color: "#5cb85c",
            marginLeft: 10,
          }}
        >
          {article.author ? article.author.username : null} -{" "}
        </Text>
        </TouchableOpacity>
        
        <Text
          style={{
            color: "#aaa",
          }}
        >
          {new Date(article.createdAt).toDateString()}
        </Text>
      </View>
      {article.author.username !== props.user ? 
      <TouchableOpacity
      onPress={() =>
        articleAuthor.following
          ? unfollowUser(article.author.username)
          : followUser(article.author.username)
      }
    >
      <Text
        style={{
          borderWidth: 1,
          padding: 5,
          color: "#aaa",
          margin: 10,
          maxWidth: "50%",
          borderColor: "#aaa",
          borderRadius: 5,
        }}
      >
        {articleAuthor.following ? "- unfollow" : "+ follow"}{" "}
        {article.author.username}
      </Text>
    </TouchableOpacity>
    : null
    }
      
      <Text style={{ fontSize: 30, margin: 20 }}>{article.body}</Text>
      <Text style={{ fontSize: 15, marginLeft: 30 }}>Comments</Text>
      {comments
        ? comments.map((comment) => {
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
                    <TouchableOpacity onPress={() => deleteComment(comment.id)}>
                      <Ionicons
                        color="#aaa"
                        size={20}
                        name={
                          Platform.OS === "ios"
                            ? "ios-trash-outline"
                            : "md-trash"
                        }
                      ></Ionicons>
                    </TouchableOpacity>
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
  onDeleteComment: (token, slug, id) =>
    dispatch(deleteComment(token, slug, id)),
  onFavoriteArticle: (token, slug) => dispatch(favoriteArticle(token, slug)),
  onUnfavoriteArticle: (token, slug) =>
    dispatch(unfavoriteArticle(token, slug)),
  onFollowUser: (token, username) => dispatch(followUser(token, username)),
  onUnfollowUser: (token, username) => dispatch(unfollowUser(token, username)),
  onGetProfile: (token, username) => dispatch(getProfile(token, username)),
  onDeleteArticle: (token, slug) => dispatch(deleteArticle(token, slug)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(SingleArticle)
);
