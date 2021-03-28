import React from "react";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { View, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUser } from "../actions/users";
import ArticlesList from "../components/ArticlesList";

function Home(props) {
  React.useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      props.onGetCurrentUser(value);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ArticlesList />
    </View>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onGetCurrentUser: (token) => dispatch(getCurrentUser(token)),
});

Home["navigationOptions"] = screenProps => ({
  headerRight: () => (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => screenProps.navigation.navigate('Tags')}
    >
      <Ionicons
        color="white"
        size={30}
        name={Platform.OS === "ios" ? "ios-search-outline" : "md-search"}
      />
    </TouchableOpacity>
  ),
});

export default connect(null, mapDispatchToProps)(Home);
