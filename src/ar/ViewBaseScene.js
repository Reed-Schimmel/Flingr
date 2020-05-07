import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
  ViroBox,
  ViroAmbientLight,
  ViroARScene,
  ViroConstants,
  ViroMaterials,
} from 'react-viro';

export default class ViewBaseScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: undefined,
      tracking: undefined,
      intensity: 10,
      color: '#FFFFFF',
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        onAmbientLightUpdate={lighting => this.setState({ ...lighting })}
        physicsWorld={{ gravity: [0, -9.81, 0] }} ref={(component) => { this.sceneRef = component; }}
      >
        <ViroAmbientLight color={this.state.color} intensity={this.state.intensity} />
        <ViroBox
          position={this.props.base} scale={[.5, .5, .5]}
          // position={this.props.arSceneNavigator.viroAppProps.base} scale={[.5, .5, .5]}
          // physicsBody={{ type: 'Dynamic', mass: 25, enabled: true, useGravity: true, restitution: 0.35, friction: 0.75 }}
          ref={(component) => { this.box = component; }}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({ tracking: state });
    } else if (state == ViroConstants.TRACKING_NONE) {
      Alert.alert('Lost tracking!');
      this.setState({ tracking: state });
    }
  }
}

ViroMaterials.createMaterials({
  hud_text_bg: {
    diffuseColor: '#00ffff'
  },
  ground: {
    diffuseColor: '#007CB6E6'
  },
  ground_hit: {
    diffuseColor: '#008141E6'
  },
  cube_color: {
    diffuseColor: '#0021cbE6'
  }
});

module.exports = ViewBaseScene;
