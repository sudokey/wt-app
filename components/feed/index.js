import React from 'react';
import { View, ListView, ActivityIndicator } from 'react-native';
import { getPosts } from '../../services/feed';
import Post from './post';

export default class Feed extends React.Component {
  static navigationOptions = {
    title: 'Feed',
  };

  constructor(props) {
    super(props);

    this.state = {
      boundary: null,
      boundaryRecordId: null,
      posts: [],
      dataSource: null,
      loading: true,
      loadingMore: false,
    };
  }

  componentDidMount() {
    getPosts()
      .then((result) => {
        const posts = result.records;
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.setState({
          posts,
          boundary: result.boundary,
          boundaryRecordId: result.boundaryRecordId,
          dataSource: ds.cloneWithRows(posts),
          loading: false,
        });
      });
  }

  loadMore() {
    if (this.state.loadingMore) {
      return;
    }

    this.setState({
      loadingMore: true,
    }, () => {
      getPosts({
        boundary: this.state.boundary,
        boundaryRecordId: this.state.boundaryRecordId,
      })
        .then((result) => {
          this.setState((prevState) => {
            const posts = this.state.posts.concat(result.records);

            return {
              posts,
              boundary: result.boundary,
              boundaryRecordId: result.boundaryRecordId,
              dataSource: prevState.dataSource.cloneWithRows(posts),
              loadingMore: false,
            };
          });
        });
    });
  }

  render() {
    return this.state.loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <ListView
        onEndReached={() => this.loadMore()}
        dataSource={this.state.dataSource}
        renderRow={data => (
          <Post
            title={data.obj.title}
          />
        )}
      />
    );
  }
}
