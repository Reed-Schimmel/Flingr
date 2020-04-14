// https://docs.viromedia.com/docs/physics#physicsbody-api

// https://w3c.github.io/geolocation-api/#dom-geolocationposition-coords
// https://courses.lumenlearning.com/boundless-physics/chapter/projectile-motion/
const launch = ({ geolocation, orientation, kineticEnergy }) => {
  const { coords: { latitude, longitude, heading, altitude } } = geolocation;
};

// given a launch, the AR system needs details on how to animate the projectile, speed and all that shizz