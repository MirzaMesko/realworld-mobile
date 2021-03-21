import React from 'react';
import { View, TouchableOpacity, Text, Switch, StyleSheet, Platform, Button } from 'react-native';

function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button title ="login" onPress={() =>  navigation.navigate('Main')}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Login;