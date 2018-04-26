import { StackNavigator } from 'react-navigation';
import Feed from './components/feed/index';

const App = StackNavigator({
  Feed: { screen: Feed },
});

export default App;
