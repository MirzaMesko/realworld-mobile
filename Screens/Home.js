import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { getCurrentUser } from "../actions/users";
import ArticlesList from "../components/ArticlesList";

function Home(props) {

  React.useEffect(() => {
    props.onGetCurrentUser(props.token);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ArticlesList />
    </View>
  );
}

const mapStateToProps = (state) => ({
  token: state.users.token,
});

const mapDispatchToProps = (dispatch) => ({
  onGetCurrentUser: (token) => dispatch(getCurrentUser(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
