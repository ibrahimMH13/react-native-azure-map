import React, { useEffect } from 'react';

interface AzureMapMarkerProps {
  position: [number, number];
  content: string;
  injectJavaScript: string | null;
  baseCssUri: string | null;
  draggable: boolean;
  color: string | null;
  secondaryColor: string | null;
  anchor:
    | 'center'
    | 'left'
    | 'right'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
}

// @ts-ignore
const AzureMarker: React.FC<AzureMapMarkerProps> = ({
  position,
  content,
  draggable = false,
  color = '#1A73AA',
  secondaryColor = 'white',
  anchor = 'bottom',
  injectJavaScript = null,
}) => {
  useEffect(() => {
    if (injectJavaScript) {
      const script = `
                (function() {
                    const marker = new atlas.HtmlMarker({
                        htmlContent: \`${content}\`,
                        draggable: ${draggable},
                        color: ${color},
                        secondaryColor: ${secondaryColor},
                        anchor: ${anchor},
                        position: [${position[0]}, ${position[1]}],
                    });
                    window.mapInstance.markers.add(marker);
                })();
            `;
      // @ts-ignore
      injectJavaScript(script);
    }
  }, [injectJavaScript, position, content]);
  return null;
};

export default AzureMarker;
