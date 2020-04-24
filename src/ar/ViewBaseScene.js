'use strict';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  ViroBox,
  ViroARPlane,
  ViroAmbientLight,
} from 'react-viro';
import GeopositionScene from './GeopositionScene';

export default class ViewBaseScene extends Component {
  constructor() {
    super();

    this.state = {
      foundPlane: false,
    };
  }

  componentDidMount() {
    // AsyncStorage.getItem('base').then(base => this.setState({ base: JSON.parse(base) }))
    // AsyncStorage.getItem('base').then(base => this.plane.setNativeProps(JSON.parse(base)) )
    AsyncStorage.getItem('base').then(base => this.setState({ base: JSON.parse(base) }));
  }

  render() {
    return (
      <GeopositionScene>
        <ViroAmbientLight color={'#FFFFFF'} intensity={10} castsShadow={true} />
        <ViroARPlane
          ref={(component) => { this.plane = component; console.log(this.plane); }}
        >
          <ViroBox
            position={[0, 0, -1]} scale={[.5, .5, .5]}
          // physicsBody={{ type: 'Dynamic', mass: 25, enabled: true, useGravity: true, restitution: 0.35, friction: 0.75 }}
          />
        </ViroARPlane>
      </GeopositionScene>
    );
  }
}

module.exports = ViewBaseScene;
