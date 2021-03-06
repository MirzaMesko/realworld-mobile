import React from "react";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { useFonts } from 'expo-font';
import { login, loginSuccess } from '../actions/users';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loaded] = useFonts({
    TitilliumWeb: require('../assets/fonts/TitilliumWeb-Bold.ttf'),
  });

  
  

  const login = () => {
    setErrors([]);
    const user = {
      email: email, 
      password: password
    }
    props.onLogin(user).then((response) => {
      if(response.status !== 200) {
        let keys = Object.keys(response);
        let error = [];
        keys.map((key) => {
          error.push([key + " " + response[key]]);
        });
        setErrors(error);
      }
    });
  }

  React.useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      setTimeout(() => {
        if(value) {
          props.onLoginSuccess(value);
        }
      if(!value) {
        setLoading(false)
      } 
      }, 2000)
      
    });
  }, []);

  if (!loaded) {
    return (
    <View style={styles.container}>
        <ActivityIndicator size={40} color="#5cb85c"/>
      </View>
    )
  }

  if(loading) {
    return (
      <View style={styles.container}>
          <Text>Welcome to</Text>
          <Text style={{color: '#5cb85c', fontSize: 50, fontFamily: 'TitilliumWeb'}}>Conduit</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
        <Text style={{ marginBottom: '20%', fontSize: 30, color: '#5cb85c', fontWeight: 'bold'}}>conduit</Text>
        <Text style={{ marginBottom: '5%', fontSize: 30, color: 'black'}}>Sign in</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
        <Text style={{ marginBottom: '10%', color: '#5cb85c'}}>Need an account?</Text>
        </TouchableOpacity>
        
        {errors && errors.map(error => {
            return <Text key={error} style={{ color: 'red', width: '80%'}}>- {error}</Text>
        })}
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Your email"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Your password"
        textContentType="password"
      />
      <Button
      color="#5cb85c"
        title="log in"
        onPress={() => login()}
      ></Button>
    </View>
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
});

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (user) => dispatch(login(user)),
        onLoginSuccess: (token) => dispatch(loginSuccess(token)),
    }
}

export default connect(null, mapDispatchToProps)(Login);
