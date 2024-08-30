import React, { useEffect, useCallback } from 'react';

interface AzureMapMarkerProps {
  position: [number, number];
  htmlIcon: string;
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

class AzureMarker extends React.Component<AzureMapMarkerProps> {
  static defaultProps = {
    draggable: false,
    color: '#1A73AA',
    secondaryColor: 'white',
    anchor: 'bottom',
    injectJavaScript: null,
  };

  render() {
    let {
      position,
      htmlIcon,
      draggable,
      color,
      secondaryColor,
      anchor,
      injectJavaScript,
    } = this.props;
    const latitude = position[0];
    const longitude = position[1];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const createMarkerScript = useCallback(() => {
      return `
      (function() {
        const marker = new atlas.HtmlMarker({
          htmlContent: \`${htmlIcon}\`,
          draggable: ${draggable},
          color: '${color}',
          secondaryColor: '${secondaryColor}',
          anchor: '${anchor}',
          position: [${latitude}, ${longitude}],
        });
        window.mapInstance.markers.add(marker);
      })();
    `;
    }, [
      htmlIcon,
      draggable,
      color,
      secondaryColor,
      anchor,
      latitude,
      longitude,
    ]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (injectJavaScript) {
        injectJavaScript(createMarkerScript());
      }
    }, [injectJavaScript, createMarkerScript]);

    return null;
  }
}

export default AzureMarker;
