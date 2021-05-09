import React, {useState} from 'react';
import { connect } from "react-redux";
import { editUser, getProfile } from '../actions/users';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  Alert
} from "react-native";

function Settings(props) {
  const { currentUser } = props;
    const [image, setImage] = useState(currentUser.image);
    const [email, setEmail] = useState(currentUser.email);
    const [username, setUsername] = useState(currentUser.username);
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState(currentUser.bio);

  const edit = () => {
    if(password === '') {
      return Alert.alert('Please enter you password.')
    }
     props.onEditUser(props.token, email, username, password, image, bio).then(() => {
       props.navigation.navigate('Profile')
     });
}
return (
  <View style={styles.container}>
      <Text style={{ marginBottom: '5%', fontSize: 30, color: 'black'}}>Your Settings</Text>
      <TextInput
      style={styles.input}
      onChangeText={setUsername}
      value={username}
      placeholder="Your username"
      textContentType="username"
    />
    <TextInput
      style={styles.input}
      onChangeText={setImage}
      value={image}
      placeholder="Your Image"
      textContentType="URL"
    />
    <TextInput
      style={styles.input}
      onChangeText={setBio}
      value={bio}
      placeholder="Your bio"
      textContentType="none"
    />
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
      title="update settings"
      onPress={() => edit()}
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

const mapStateToProps = (state) => ({
  token: state.users.token,
  user: state.users.user,
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
    onEditUser: (token, email, username, password, image, bio) => dispatch(editUser(token, email, username, password, image, bio)),
    onGetProfile: (token, username) => dispatch(getProfile(token, username))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
