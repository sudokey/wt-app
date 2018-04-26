import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Button,
  View,
  Text,
  ListView,
  ActivityIndicator,
} from 'react-native';

const getPosts = () => {
  return fetch('https://ng.whotrades.com/en/rss/news/json/?domain=whotrades.com&limit=40')
    .then(resp => resp.json())
    .then((data = {}) => {
      return data.response || [];
    });
}

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dataSource: null,
      posts: [],
    };
  }

  componentDidMount() {
    getPosts()
      .then((posts) => {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.setState(prevState => ({
          posts: prevState.posts.concat(posts),
          loading: false,
          dataSource: ds.cloneWithRows(posts),
        }));
      });
  }

  loadMorePosts() {
    if (this.state.loading) {
      return;
    }

    getPosts()
      .then((posts) => {
        this.setState((prevState) => {
          const p = prevState.posts.concat(posts);

          return {
            loading: false,
            posts: p,
            dataSource: prevState.dataSource.cloneWithRows(p),
          };
        });
      });
  }

  render() {
    return this.state.loading ? (
      <ActivityIndicator
        size="large"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    ) : (
      <ListView
        onEndReached={() => this.loadMorePosts()}
        dataSource={this.state.dataSource}
        renderRow={rowData => {
          return (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  padding: 20,
                  borderBottomWidth: 1,
                  borderColor: '#ddd'
                }}
              >
                {rowData.title}
              </Text>
            </View>
          );
        }}
      />
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      posts: null,
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <View>
          <Button
            title="Profile"
            onPress={() => {
              navigate('Profile');
            }}
          />
        </View>
        <View style={{flex: 2}}>
          <Posts />
        </View>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Button
        title="Home"
        onPress={() => {
          navigate('Home');
        }}
      />
    );
  }
}

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: {screen: ProfileScreen },
});

export default App;
