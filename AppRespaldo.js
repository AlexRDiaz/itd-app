import ReceiveSharingIntent from 'react-native-receive-sharing-intent';


import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';




//  return sharedFile;
//}


// To clear Intents
//ReceiveSharingIntent.clearReceivedFiles();



export default function App() {
    const  [contenido,setContenido]= useState({})
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  const[files,setFiles]= useState([]);
  var file={};
  useEffect( () =>{
    try{
    ReceiveSharingIntent.getReceivedFiles( files => {
      // files returns as JSON Array example
      setFiles( files);
    //  console.log(files);
  
     // file=files;
    },
      (error) => {
        console.log(error);
      },
      'ShareMedia' // share url protocol (must be unique to your app, suggest using your apple bundle id)
    );
    }catch(e){
      console.log("error en",e )

    }
  
  },[]);


if(!files.length==0){
console.log("mis files",files[0].weblink);
file=files[0]
}else{
  console.log("no files founded")

}

  return (
    <View  style={{
        backgroundColor: value,
        borderBottomColor: '#000111',
        borderBottomWidth: 1,
      }}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>aqui debe mostrarse lo que voy a compartir:</Text>
      <TextInput
      label="Label"
      variant="outlined"
      trailing={props => (
        <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
      )}
    />
      <Text>{
        JSON.stringify(file)
        
        }</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    backgroundColor: value,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
});
