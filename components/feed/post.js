import React from 'react';
import HTMLView from 'react-native-htmlview';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from '../icon';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },

  inner: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },

  header: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    overlayColor: '#fff',
  },

  menuToggler: {
    height: 40,
  },

  titleContainer: {
    paddingBottom: 10,
  },

  title: {
    fontWeight: '500',
    fontSize: 16,
  },

  content: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },

  created: {
    color: '#aaa',
  },

  authorName: {
    fontWeight: '500',
    color: '#333',
  },

  footer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const htmlStyles = StyleSheet.create({
  div: {
    fontSize: 16,
    color: '#333',
  },
});

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.inner}>
            <View style={styles.header}>
              <View style={{ paddingRight: 10 }}>
                <Image
                  style={styles.avatar}
                  source={{ uri: this.props.authorImage }}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.authorName} numberOfLines={1}>{this.props.authorName}</Text>
                <Text style={styles.created} numberOfLines={1}>{this.props.created}</Text>
              </View>
              <View style={styles.menuToggler}>
                <TouchableHighlight>
                  <Icon name="toggler" height="24" width="24" fill="#999" />
                </TouchableHighlight>
              </View>
            </View>
            {this.props.title ? (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{this.props.title}</Text>
              </View>
            ) : null}
            <View style={styles.content}>
              <HTMLView
                value={this.props.shortContent}
                stylesheet={htmlStyles}
              />
            </View>
            <View style={styles.footer}>
              <View style={styles.inline}>
                <View>
                  <Icon name="like" height="18" width="18" fill="#666" />
                </View>
                <View>
                  <Text style={{ paddingRight: 15, paddingLeft: 15, color: '#666' }}>{this.props.likes}</Text>
                </View>
                <View>
                  <Icon name="dislike" height="18" width="18" fill="#666" />
                </View>
              </View>
              <View style={styles.inline}>
                <View>
                  <Icon name="comment" height="18" width="18" fill="#666" />
                </View>
                <View>
                  <Text style={{ paddingLeft: 2, color: '#666' }}>{this.props.commentsCount}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
