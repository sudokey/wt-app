import React from 'react';
import { View, Text } from 'react-native';

export default function Post(props) {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
}
