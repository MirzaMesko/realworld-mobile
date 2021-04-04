import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons";
import Home from "./Screens/Home";
import YourFeed from "./Screens/YourFeed";
import CreateArticle from "./Screens/CreateArticle";
import Profile from "./Screens/Profile";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import ArticlesList from "./components/ArticlesList";
import TagsList from "./components/TagsList";
import SingleArticle from './components/SingleArticle';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator 
    initialRouteName="Home" 
    tabBarOptions={{
      activeTintColor: 'white',
      inactiveTintColor: '#ccc',
          style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? "#5cb85c" : "#5cb85c",
            shadowColor: "rgba(0, 0 , 0, 0.24)",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowradius: 6,
            shadowOpacity: 1,
          },
   }}
    
    >
      <Tab.Screen name="Home" 
        component={Home}

        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name={`${Platform.OS === "ios" ? "ios-home" : "md-home"}`} size={30} color={color} />
          )
        }}
        />
        <Tab.Screen name="Your feed" 
        component={YourFeed}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name={`${Platform.OS === "ios" ? "ios-bookmark" : "md-bookmark"}`} size={30} color={color} />
          )
        }}
        />
        <Tab.Screen name="My Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name={`${Platform.OS === "ios" ? "ios" : "md"}-person`} size={30} color={color} />
          )
        }}
        />
        <Tab.Screen name="Add Article" 
        component={CreateArticle}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name={`${Platform.OS === "ios" ? "add-circle" : "md-add-circle"}`} size={30} color={color} />
          )
        }}/>
    </Tab.Navigator>
  )
}

function AppContainer(props) {
  return (
    <NavigationContainer >
      <Stack.Navigator 
      initialRouteName='Login'
      screenOptions={{
        title: '',
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#5cb85c",
    },
      }}>
        { props.isLoggedIn ? 
        <>
          <Stack.Screen 
          name='Home'
          component={HomeScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('Tags')}
              >
                <Ionicons
                  color="white"
                  size={30}
                  name={Platform.OS === "ios" ? "ios-search-outline" : "md-search"}
                />
              </TouchableOpacity>
            )
          })}
           />
           <Stack.Screen name='SingleArticle' component={SingleArticle} />
           <Stack.Screen name='Tags' component={TagsList} />
           <Stack.Screen name="Articles" component={ArticlesList} />
           <Stack.Screen name="Profile" component={Profile} />
           </>
      : 
      <>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
      </>
      }
      
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.users.isLoggedIn,
})
export default connect(mapStateToProps)(AppContainer);
