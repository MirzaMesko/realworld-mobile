import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Article = (props) => {
  const navigation = useNavigation();

    if (!props.articles.length) {
      return <ActivityIndicator size={40} color="#5cb85c"/>;
    }
    return (
      <ScrollView style={styles.container}>
        {props.articles.map((article) => {
          let date = new Date(article.createdAt);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SingleArticle", {article: article});
              }}
              style={styles.articleBox}
              key={article.slug}
            >
              <View>
                <Text>
                  {article.title} - {article.description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{
                    uri:
                      article.author && article.author.image !== ""
                        ? article.author.image
                        : "https://reactnative.dev/img/tiny_logo.png",
                  }}
                  style={{ width: 25, height: 25, resizeMode: "stretch" }}
                />
                <Text style={{ color: "#aaa" }}>
                  {" "}
                  {article.author ? article.author.username : null} -{" "}
                  {date.toDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  articleBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    padding: 10,
    marginBottom: 20,
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default Article;
