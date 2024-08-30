import React, { useEffect, useCallback } from 'react';

interface AzureMapMarkerProps {
  position: [number, number];
  content: string;
  injectJavaScript: ((script: string) => void) | null;
  baseCssUri?: string | null;
  draggable?: boolean;
  color?: string | null;
  secondaryColor?: string | null;
  anchor?:
    | 'center'
    | 'left'
    | 'right'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
}

const AzureMarker: React.FC<AzureMapMarkerProps> = ({
  position,
  content,
  draggable = false,
  color = '#1A73AA',
  secondaryColor = 'white',
  anchor = 'bottom',
  injectJavaScript = null,
}) => {
  const latitude = position[0];
  const longitude = position[1];

  const createMarkerScript = useCallback(() => {
    return `
      (function() {
        const marker = new atlas.HtmlMarker({
          htmlContent: \`${content}\`,
          draggable: ${draggable},
          color: '${color}',
          secondaryColor: '${secondaryColor}',
          anchor: '${anchor}',
          position: [${latitude}, ${longitude}],
        });
        window.mapInstance.markers.add(marker);
      })();
    `;
  }, [content, draggable, color, secondaryColor, anchor, latitude, longitude]);

  useEffect(() => {
    if (injectJavaScript) {
      injectJavaScript(createMarkerScript());
    }
  }, [injectJavaScript, createMarkerScript]);

  return null;
};

export default AzureMarker;
