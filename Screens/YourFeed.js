import React from 'react';
import { View } from 'react-native';
import ArticlesList from '../components/ArticlesList';

function YourFeed() {

    return (
        <View style={{flex: 1}}>
            <ArticlesList feed={true} />
        </View>
    )
}

export default YourFeed;