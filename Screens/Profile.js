import React from "react";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { logout } from "../actions/users";
import { getArticles } from '../actions/articles';
import { followUser, unfollowUser, getProfile } from "../actions/users";

function Profile(props) {
  const [userProfile, setUserProfile] = React.useState([]);
  const { currentUser } = props;

  const logout = () => {
    AsyncStorage.removeItem('token');
    props.onLogout();
  };

  const myArticles = () => {
    props.onGetArticles(`author=${userProfile.username}`).then((response) => {
      props.navigation.navigate("Articles", {articles: response, title: `${userProfile.username}'s Articles`});
    });
  }

  const favorited = () => {
    props.onGetArticles(`favorited=${userProfile.username}`).then((response) => {
      props.navigation.navigate("Articles", {articles: response, title: `Favorited by ${userProfile.username}`});
  })
}

useFocusEffect(
  React.useCallback(() => {
    setUserProfile([]);
    if(props.route.params) {
      const { user } = props.route.params;
      props.onGetProfile(props.token, user).then((response) => {
        setUserProfile(response.data.profile);
      });
    } else {
      setUserProfile(currentUser)
    }
  }, [props])
)

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {userProfile.username === props.currentUser.username ? 
          <TouchableOpacity 
          style={{ marginRight: -350, marginTop: -25, marginBottom: 25}}
          onPress={() => props.navigation.navigate("Settings")}
          >
          <Text>Edit</Text>
        </TouchableOpacity>
        : 
        null
      }
        <Image
          source={{
            uri:
              userProfile && userProfile.image !== ""
                ? userProfile.image
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
        <Text>{userProfile.username}</Text>
        <Text style={{ color: '#aaa'}}>{userProfile.bio}</Text>
        {userProfile.username === props.currentUser.username ? 
          null
        : 
        <TouchableOpacity
        onPress={() =>
          userProfile.following
            ? unfollowUser(userProfile.username)
            : followUser(userProfile.username)
        }
      >
        <Text
          style={{
            borderWidth: 1,
            padding: 5,
            color: "#aaa",
            margin: 10,
            maxWidth: "70%",
            borderColor: "#aaa",
            borderRadius: 5,
          }}
        >
          {userProfile.following ? "- unfollow" : "+ follow"}{" "}
          {userProfile.username}
        </Text>
      </TouchableOpacity>
      }
      </View>
        <TouchableOpacity style={styles.options} onPress={() => myArticles()}><Text>My Articles</Text></TouchableOpacity>
        <TouchableOpacity style={styles.options} onPress={() => favorited()}><Text>Favorited</Text></TouchableOpacity>
        <TouchableOpacity style={styles.options}><Text></Text></TouchableOpacity>
        <TouchableOpacity style={styles.options} onPress={() => logout()}><Text>Log out</Text></TouchableOpacity>
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
  currentUser: state.users.currentUser,
  articles: state.articles.articles,
  token: state.users.token,
});

const mapDispatchToProps = dispatch => ({
  onGetArticles: (param, offset) => dispatch(getArticles(param, offset)),
  onFollowUser: (token, username) => dispatch(followUser(token, username)),
  onUnfollowUser: (token, username) => dispatch(unfollowUser(token, username)),
  onGetProfile: (token, username) => dispatch(getProfile(token, username)),
  onLogout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
