import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './Screens/Home';
import CreateArticle from './Screens/CreateArticle';
import Profile from "./Screens/Profile";
import Login from './Screens/Login';

/*
const HistoryStack = createStackNavigator({
    History: {
        screen: History,
        navigationOptions: {
          title: 'History'
        }
    },
   EntryDetail: {
       screen: EntryDetail,
       navigationOptions: {
           headerTintColor: purple,
          headerStyle: {
              backgroundColor: pink
          }
        }
   }
});
*/
const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
          title: 'Conduit',
          headerTintColor: 'white',
          headerStyle: {
              backgroundColor: '#5cb85c'
          }
        }  
      }
})

const ArticleStack = createStackNavigator({
    Article: {
        screen: CreateArticle,
        navigationOptions: {
            title: 'Create an article',
            headerTintColor: 'white',
          headerStyle: {
              backgroundColor: '#5cb85c'
          }
        }
    }
})

const ProfileStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
            headerTintColor: 'white',
          headerStyle: {
              backgroundColor: '#5cb85c'
          }
        }
    }
})


const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Article: ArticleStack,
  Profile: ProfileStack,
  }, { 
        initialRouteName: 'Home',
       defaultNavigationOptions: ({ navigation }) => ({
         tabBarIcon: ({ tintColor }) => {
           const { routeName } = navigation.state;
     
           let iconName;
           if (routeName === 'Home' ) {
             iconName = `${Platform.OS === 'ios' ? 'ios-home' : 'md-home'}`;
           } else if (routeName === 'Article') {
             iconName = `${Platform.OS === 'ios' ? 'add-circle' : 'md-add-circle'}`;
           } else if (routeName === 'Profile') {
             iconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-person`;
           }
     
           
            return <Ionicons name={iconName} size={30} color={tintColor} />;
         },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? 'purple' : 'white',
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? 'white' : '#5cb85c',
        shadowColor: 'rgba(0, 0 , 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowradius: 6,
        shadowOpacity: 1
      } 
    }
    })
})

const SwitchNavigator = createSwitchNavigator(
    {
      Main: TabNavigator,
      Login,
    },
    {
      initialRouteName: 'Login',
    },
  );

export default createAppContainer(SwitchNavigator);