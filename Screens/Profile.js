import React from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { logout } from "../actions/users";
import { getArticles } from '../actions/articles';

function Profile(props) {
  const { currentUser } = props;

  const onLogout = () => {
    logout();
    props.navigation.navigate("Login");
  };

  const myArticles = () => {
    props.onGetArticles(`author=${currentUser.username}`).then((response) => {
      props.navigation.navigate("Articles", {articles: response, title: 'My Articles'});
    });
  }

  const favorited = () => {
    props.onGetArticles(`favorited=${currentUser.username}`).then((response) => {
      props.navigation.navigate("Articles", {articles: response, title: 'Favorited'});
  })
}
  
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TouchableOpacity style={{ marginRight: -350, marginTop: -25, marginBottom: 25}}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <Image
          source={{
            uri:
              currentUser && currentUser.image !== ""
                ? currentUser.image
                : "https://reactnative.dev/img/tiny_logo.png",
          }}
          style={{
            width: 185,
            height: 185,
            resizeMode: "stretch",
            borderRadius: 40,
            marginBottom: 15
          }}
        />
        <Text>{currentUser.username}</Text>
        <Text style={{ color: '#aaa'}}>{currentUser.bio}</Text>
      </View>
        <TouchableOpacity style={styles.options} onPress={() => myArticles()}><Text>My Articles</Text></TouchableOpacity>
        <TouchableOpacity style={styles.options} onPress={() => favorited()}><Text>Favorited</Text></TouchableOpacity>
        <TouchableOpacity style={styles.options}><Text></Text></TouchableOpacity>
        <TouchableOpacity style={styles.options} onPress={() => onLogout()}><Text>Log out</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userInfo: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
    width: "100%",
    maxHeight: 350,
  },
  options: {
    width: "90%",
    justifyContent: "flex-start",
    padding: 20,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1
  }
});

const mapStateToProps = (state) => ({
  user: state.users.username,
  currentUser: state.users.currentUser,
  articles: state.articles.articles
});

const mapDispatchToProps = dispatch => ({
  onGetArticles: (param, offset) => dispatch(getArticles(param, offset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
