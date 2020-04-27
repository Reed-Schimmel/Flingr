/* eslint-disable */

// GEO LOCATION ACTIONS
// (1/111111) * meters = deltaLat/Lon https://drive.google.com/open?id=1XWlZ8BM00PIZ4qk43DieoJjcXjK4z7xe&usp=sharing
const METERS_TO_COORD = (1/111111);
const _viroToGeo = (coords, plane) => { // TODO: https://stackoverflow.com/questions/47419496/augmented-reality-with-react-native-points-of-interest-over-the-camera
  // Given coords and a ViroARPlane calculate global position of plane
  const { latitude, longitude } = coords;
  // plane units are meters
  // https://docs.viromedia.com/docs/viroarplaneselector#section-anchor
  const { position } = plane;
  const [x, y, z] = position; // camera points -z
  const compass = '';
  // TODO: account for compass, maybe initialize the camera to point south

  return {
    ...coords,
    // latitude: latitude + METERS_TO_COORD * z,
    // longitude: longitude + METERS_TO_COORD * x
  };
};

const setBase = (dispatch) => async (selectedPlane) => {
  // get user position coords and offset from user to base anchor
  // user coords + anchor position is base location

  // 1. get gps, heading
  // https://reactnative.dev/docs/geolocation.html#getcurrentposition
  const geoOptions = { enableHighAccuracy: true };

  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const geo_success = ({ coords }) => {
    baseCoords = _viroToGeo(coords, selectedPlane);

  };

  navigator.geolocation.getCurrentPosition(geo_success, () => null, geoOptions);

  // 2. firebase set base
  const uploadBase = () => {};
};

/*
selected plane
{"vertices":[[-0.35680094361305237,0,0.47087258100509644],[-0.022602787241339684,0,0.4838920831680298],[0.0036222985945641994,0,0.48218560218811035],[0.05830833315849304,0,0.47756513953208923],[0.11332974582910538,0,0.39548420906066895],[0.35633593797683716,0,-0.14470498263835907],[0.3792717456817627,0,-0.19653703272342682],[0.3580625355243683,0,-0.32813760638237],[0.328347384929657,0,-0.3696866035461426],[0.22725556790828705,0,-0.444902241230011],[0.19075210392475128,0,-0.4618402421474457],[0.15114055573940277,0,-0.4733673334121704],[0.10812824219465256,0,-0.4771307110786438],[0.021425018087029457,0,-0.4838920831680298],[-0.02891366556286812,0,-0.47641631960868835],[-0.3792717456817627,0,-0.36881697177886963],[-0.3792717456817627,0,0.4624912738800049]],"alignment":"HorizontalUpward","height":0.9677841663360596,"width":0.7585434913635254,"center":[0.01774294674396515,0,0.0022275447845458984],"type":"plane","rotation":[5.0610134732930035e-15,14.982720038812896,1.3084126761707917e-15],"scale":[1,1,1],"position":[0.08330602943897247,-1.0613735914230347,-1.039136290550232],"anchorId":"-108309376"}
*/