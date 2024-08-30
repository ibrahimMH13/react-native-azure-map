// index.d.ts

import { StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

// Declare the props for AzureMap component
export interface AzureMapProps {
  lan: number;
  lang: number;
  style?: StyleProp<ViewStyle>;
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
  children?: ReactNode;
}

// Declare the AzureMap component itself
export declare const AzureMap: React.FC<AzureMapProps>;

// Declare the props for AzureMarker component
export interface AzureMarkerProps {
  position: [number, number];
  content: string;
  injectJavaScript?: (script: string) => void;
}

// Declare the AzureMarker component itself
export declare const AzureMarker: React.FC<AzureMarkerProps>;
