import React from 'react';
import  { View, Text, ActivityIndicator, StyleSheet }  from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
  const { url } = route.params; // Get the URL from route parameters

  return (
     <View style={{ flex: 1 }}>
      {/* Display the URL */}
      <Text style={styles.urlText}>{url}</Text>
      <WebView
        source={{ uri: url }}
        startInLoadingState={true} // Show loading indicator
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
   urlText: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'lightgray',
  },
});

export default WebViewScreen;
