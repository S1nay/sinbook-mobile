import { StatusBar, View, Text, SafeAreaView } from 'react-native';
import Env from 'react-native-config';

// splash screen
// logo
// navigation
// storage, api, sockets (data layer)
// DI-container

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text>Hello World!</Text>
        <Text>{Env.API_URL}</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
