import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    padding: 15,
    paddingRight: 0,
  },

  text: {
    flex: 2,
    padding: 15,
  },
});

export default function ListItem(props) {
  return (
    <View style={styles.wrapper}>
      <TouchableHighlight
        underlayColor="#eee"
        onPress={() => {
          if (typeof props.onPress === 'function') {
            props.onPress();
          }
        }}
      >
        <View style={styles.item}>
          <View style={styles.icon}>{props.icon}</View>
          <View style={styles.text}>{props.title}</View>
        </View>
      </TouchableHighlight>
    </View>
  );
}
