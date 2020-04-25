'use strict';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  ViroBox,
  ViroARPlane,
  ViroAmbientLight,
  ViroARScene
} from 'react-viro';

const compareAnchors = (anc1, anc2) => {
  const keys = ['center', 'height', 'width', 'position', 'rotation', 'alignment'];
};

export default class ViewBaseScene extends Component {
  constructor() {
    super();

    this.state = {
      foundAnchor: { anchorId: undefined },
      base: undefined,
    };

    this._onAnchorFound = this._onAnchorFound.bind(this);
  }

  componentDidMount() {
    // AsyncStorage.getItem('base').then(base => this.setState({ base: JSON.parse(base) }))
    // AsyncStorage.getItem('base').then(base => this.plane.setNativeProps(JSON.parse(base)) )
    // AsyncStorage.getItem('base').then(base => this.setState({ base: JSON.parse(base) }));
  }

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        // anchorDetectionTypes='PlanesHorizontal'
        physicsWorld={{ gravity: [0, -9.81, 0] }} ref={(component) => { this.sceneRef = component; }}
      // rotation={this.state.heading} https://github.com/viromedia/viro/issues/118#issuecomment-352500764
      >
        <ViroAmbientLight color={'#FFFFFF'} intensity={10} castsShadow={true} />
        <ViroARPlane
          key='basePlane'
          ref={(component) => { this.plane = component; /*console.log(this.plane);*/ }}
          onAnchorFound={this._onAnchorFound}
          anchorId={this.state.foundAnchor.anchorId}
          // pauseUpdates={true}
          visible={this.state.foundAnchor.anchorId !== undefined}
        >
          <ViroBox
            position={[0, 0, -1]} scale={[.5, .5, .5]}
          // physicsBody={{ type: 'Dynamic', mass: 25, enabled: true, useGravity: true, restitution: 0.35, friction: 0.75 }}
          />
        </ViroARPlane>
      </ViroARScene>
    );
  }

  _onAnchorFound(foundAnchor) {
    if (foundAnchor.type != 'plane'
      || this.state.foundAnchor.anchorId !== undefined) {
      return;
    }

    // conditions to match anchor for storage
    // if (foundAnchor)
    this.setState({ foundAnchor });

    console.log(foundAnchor, this.props.base);
    // this.plane.setNativeProps({ 'pauseUpdates': true });
  }

}

module.exports = ViewBaseScene;
