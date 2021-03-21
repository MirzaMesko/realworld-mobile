import React from 'react';
import { View, TouchableOpacity, Text, Switch, StyleSheet, Platform } from 'react-native';

function CreateArticle() {
    return (
        <View style={styles.container}>
            <Text>Create new article</Text>
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

export default CreateArticle;