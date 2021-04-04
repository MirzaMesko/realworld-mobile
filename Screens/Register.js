import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/users";
import { View, TextInput, Text, StyleSheet, Button, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

const Register = (props, { navigation }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState([]);

  const register = () => {
    setErrors([]);
    const user = {
      username: username,
      email: email,
      password: password,
    };
    props.onRegister(user).then((response) => {
      if (response.status !== 200) {
        let keys = Object.keys(response);
        let error = [];
        keys.map((key) => {
          error.push([key + " " + response[key]]);
        });
        setErrors(error);
      }
    });
  };

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1}}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <View style={styles.container}>
        <Text
        style={{
          marginBottom: "12%",
          fontSize: 30,
          color: "#5cb85c",
          fontWeight: "bold",
        }}
      >
        conduit
      </Text>
      <Text style={{ marginBottom: "3%", fontSize: 30 }}>Sign up</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
      <Text style={{ marginBottom: "10%", color: "#5cb85c" }}>
        Have an account?
      </Text>
      </TouchableOpacity>
     
      {errors &&
        errors.map((error) => {
          return <Text key={error} style={{ color: 'red', width: '80%'}}> - {error}</Text>;
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
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Your username"
        textContentType="username"
      />
      <Button
        color="#5cb85c"
        title="sign up"
        onPress={() => register()}
      ></Button>
        </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: "90%",
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderWidth: 2,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (user) => dispatch(registerUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
