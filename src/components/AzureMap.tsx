import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

interface AzureMapProps {
  lan: number;
  lang: number;
  style?: any;
  onMapReady?: () => void;
  apiKey: string;
  zoom?: number;
  mapStyleMode?:
    | 'grayscale'
    | 'grayscale_dark'
    | 'road'
    | 'high_contrast_dark'
    | 'night'
    | 'road_shaded_relief'
    | 'satellite'
    | 'satellite_road_labels';
  baseUri?: string | null;
  baseCssUri?: string | null;
  children?: any;
}
function isViewStyle(style: any): style is any {
  return style && typeof style === 'object' && !Array.isArray(style);
}

const AzureMap: React.FC<AzureMapProps> = ({
  apiKey,
  lan,
  lang,
  style = {},
  zoom = 7,
  mapStyleMode = 'grayscale',
  baseUri = null,
  baseCssUri = null,
  onMapReady,
  children,
}) => {
  const initUrl =
    'https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js';
  const initMapControl =
    'https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css';
  const [baseUrl, setBaseUrl] = useState(initUrl);
  const [mapControlCss, setMapControlCss] = useState(initMapControl);
  const webViewRef = useRef<WebView>(null);
  const [isMapInstanceAvailable, setIsMapInstanceAvailable] = useState(false);
  const finalStyle: any = {
    ...(typeof style === 'object' ? style : {}),
    flex: !style?.width && !style?.height ? 1 : undefined,
    height: style?.height,
    width: style?.width,
  };

  useEffect(() => {
    if (baseUri) {
      setBaseUrl(baseUri);
    }
    if (baseCssUri) {
      setMapControlCss(baseCssUri);
    }
  }, [baseUri, baseCssUri]);

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Azure Map</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="${mapControlCss}" rel="stylesheet" />
      <script src="${baseUrl}"></script>
      <style>
        html, body, #map {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        (function() {
          const map = new atlas.Map('map', {
            center: [${lan}, ${lang}],
            zoom: ${zoom},
            style: '${mapStyleMode}',
            authOptions: {
              authType: 'subscriptionKey',
              subscriptionKey: '${apiKey}'
            }
          });

          map.events.add('ready', function () {
            window.mapInstance = map;
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'mapReady',
              mapInstanceStatus: 'available'
            }));
          });
        })();
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log(data);
      if (data.type === 'mapReady') {
        setIsMapInstanceAvailable(true);
        if (onMapReady) {
          onMapReady();
        }
      }
    } catch (e) {
      console.error('Failed to parse message from WebView:', e);
    }
  };

  const injectJavaScriptToWebView = (script: string) => {
    if (webViewRef.current && isMapInstanceAvailable) {
      webViewRef.current.injectJavaScript(`
        (function() {
          ${script}
          true; // Ensure the script returns a valid result
        })();
      `);
    } else {
      console.error('WebView is not available or Map instance is not ready');
    }
  };

  useEffect(() => {
    if (isMapInstanceAvailable) {
      console.log('Map instance is available');
    } else {
      console.log('Map instance is not yet available');
    }
  }, [isMapInstanceAvailable]);

  return (
    <View style={finalStyle}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handleMessage}
        onLoadEnd={() => console.log('WebView content loaded')}
      />
      {isMapInstanceAvailable &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              injectJavaScript: injectJavaScriptToWebView,
            });
          }
          return child;
        })}
    </View>
  );
};

export default AzureMap;
