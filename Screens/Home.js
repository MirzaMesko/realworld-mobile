import React from 'react';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentUser } from '../actions/users';
import ArticlesList from '../components/ArticlesList';

function Home(props) {
  React.useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      props.onGetCurrentUser(value);
    });
  }, [])

    return (
        <View style={{flex: 1}}>
            <ArticlesList />
        </View>
    )
}

  const mapDispatchToProps = dispatch => ({
    onGetCurrentUser: (token) => dispatch(getCurrentUser(token)),
  })

export default connect(null, mapDispatchToProps)(Home);