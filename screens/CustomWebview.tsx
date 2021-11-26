import { useRoute } from '@react-navigation/core';
import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Layout from '../components/common/Layout';

function CustomWebview() {
  const route = useRoute();
  const { uri, title } = route.params as { uri: string, title: string };
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  console.log({ uri });
  const insets = useSafeAreaInsets();

  
  return (
    <Layout title={title}>
      <WebView
        startInLoadingState={true}
        style={{
          width: windowWidth,
          height: windowHeight,
          flex: 1,
          marginTop:40
        }}
        originWhitelist={['https://*']}
        scalesPageToFit={true}
        androidLayerType={'software'}
        source={{ uri }}
      />
    </Layout>
  );
}

export default CustomWebview;
