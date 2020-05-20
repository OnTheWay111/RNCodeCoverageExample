/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

function App(): ReactClass<{}> {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'column' }}>
            <Text>你好吃了吗11111？</Text>
            <Button title="Button1" onPress={() =>
                Alert.alert('Button1')
            }/>
            <Button title="Button2" onPress={() => Alert.alert('Button2')}/>
            <Button title="Button3" onPress={() => Alert.alert('Button3')}/>
            <Button title="Button4" onPress={() => Alert.alert('Button4')}/>
            <Button title="Button5" onPress={() => Alert.alert('Button5')}/>
            <Button title="Button6" onPress={() => Alert.alert('Button6')}/>
            <Button title="Button7" onPress={() => Alert.alert('Button7')}/>
            <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
          <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                 style={{width: 400, height: 400}} />
        </View>
      );
}

// post window.__coverage__ to server every 2 seconds
setInterval(function() {
  fetch('http://10.60.139.6:9999/coverage/client', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(window.__coverage__)
  })
  .then(function() {
    var date = new Date();
    console.log(date + "发送覆盖率成功!");
    console.log(window.__coverage__);
  })
  .catch(function(error) {
      console.log('发送覆盖率失败: ' + error.message);
      });
}, 4000);

//export default App;
module.exports = App;

