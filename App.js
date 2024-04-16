import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#ff0080'}
            centerComponent={{
              text: 'Monkey Chunky',
              style: { color: '#fff', fontSize: 20 },
            }}
          />

          <Image
            style={styles.imagenIcon}
            source={
              require('./assets/mono4.png')
            }
          />

          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ text: text });
            }}
            value={this.state.text}
          />
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              var word=this.state.text.toLowerCase().trim();
              console.log(word);
              db[word]?(
              this.setState({ chunks: db[word].chunks }),
              this.setState({ phonicSounds: db[word].phones })
              ):
              Alert.alert("La palabra no existe");
            }}>
            <Text style={styles.buttonText}>GO</Text>
          </TouchableOpacity>
          <View>
            {this.state.chunks.map((item, index) => {
              return (
                <PhonicSoundButton
                  wordChunk={this.state.chunks[index]}
                  soundChunk={this.state.phonicSounds[index]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
},
inputBox:{
  marginTop:20,
  width:'80%',
  alignSelf:'center',
  borderWidth:2,
  borderColor:'pink',
},
goButton:{
  width:'50%',
  alignSelf:'center',
  marginTop:20,
},
buttonText:{
  textAlign:'center',
  fontSize:30,
  backgroundColor:'pink',
},
displayText:{
  textAlign:'center',
  fontSize:30,
},
imagenIcon:{
  width:50,
  height:50,
  alignSelf:'center'
}
});
