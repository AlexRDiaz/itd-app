import React from "react";
import { WebView } from 'react-native-webview';

const VisorWeb = (props) => {
    return (
        <WebView 
          source={{ uri: props.url }}
        />
      );
}

export default VisorWeb