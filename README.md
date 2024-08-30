# react-native-azure-maps

react native component for microsoft azure maps unofficial

## Installation

```sh
npm install react-native-azure-map
```

## Usage


```jt
import { AzureMap } from 'react-native-azure-map';

// ...
<AzureMap apiKey={}  lan={34.46667} lang={31.5} zoom={10} >
  <AzureMarker position={} htmlIcon={}></AzureMarker>
</AzureMap>
```
## `AzureMap` Props

| Prop Name     | Type    | Required | Default   | Description                                                                                          |
|---------------|---------|----------|-----------|------------------------------------------------------------------------------------------------------|
| `latitude`    | number  | Yes      | `null`    | The longitude of the map's initial center.                                                           |
| `longitude`   | number  | Yes      | `null`    | The latitude of the map's initial center.                                                            |
| `style`       | object  | No       | `{}`      | The style object to customize the map container.                                                     |
| `onMapReady`  | func    | No       | `null`    | Callback function that is called when the map has finished loading.                                  |
| `apiKey`      | string  | Yes      | `null`    | Azure Maps subscription key required for authenticating API requests.                                |
| `zoom`        | number  | No       | `7`       | The initial zoom level of the map.                                                                   |
| `mapStyleMode`| string  | No       | `grayscale`| The visual style of the map. Can be one of: `'grayscale'`, `'road'`, `'satellite'`, `'night'`, etc. |
| `baseUri`     | string  | No       | `null`    | The base URI for loading the Azure Maps JavaScript SDK.                                              |
| `baseCssUri`  | string  | No       | `null`    | The base URI for loading the Azure Maps CSS.                                                         |
| `children`    | node    | No       | `null`    | Child components such as markers, which can be added to the map.                                      |

## `AzureMarker` Props

| Prop Name        | Type       | Required | Default     | Description                                                                                          |
|------------------|------------|----------|-------------|------------------------------------------------------------------------------------------------------|
| `position`       | array      | Yes      | `[0, 0]`    | The `[latitude, longitude]` array that defines the position of the marker.                           |
| `htmlIcon`        | string     | Yes      | `null`      | The HTML content that will be displayed inside the marker.                                           |
| `injectJavaScript` | func     | Yes      | `null`      | A function to inject JavaScript into the WebView to create the marker.                               |
| `draggable`      | boolean    | No       | `false`     | Determines if the marker can be dragged.                                                             |
| `color`          | string     | No       | `'#1A73AA'` | The primary color of the marker.                                                                     |
| `secondaryColor` | string     | No       | `'white'`   | The secondary color of the marker (e.g., for borders or other elements).                             |
| `anchor`         | string     | No       | `'bottom'`  | Determines how the marker is anchored relative to its position. Can be one of `'center'`, `'left'`, `'right'`, `'bottom'`, `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`. |

## Example
```angular2html
<AzureMap apiKey={}  lan={34.46667} lang={31.5} zoom={10} >
</AzureMap>

```
![gaza goelocation](/assets/gaza.png)


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

