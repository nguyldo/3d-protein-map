import React from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coords: [
        [0, 0, 0],
        [1, 1, 0],
        [2, 2, 0],
        [3, 3, 0],
        [1, -1, 0],
        [2, -2, 0],
        [3, -3, 0]
      ]
    }
  }

  componentDidMount() {

    

    var scene = new THREE.Scene();
    var raycaster = new THREE.Raycaster();

    var mouse = new THREE.Vector2();

    var onMouseMove = function(e) {

      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
    
      mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    
    }

    window.addEventListener( 'mousemove', onMouseMove, false );

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var controls = new OrbitControls( camera, renderer.domElement );

    camera.position.set(15, 15, 15);
    //camera.up.set( 0, 0, 1 );
    camera.lookAt(0, 0, 0);
    
    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
    
    for (let i = 0; i < 7; i++) {
      var geometry = new THREE.SphereGeometry();
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var point = new THREE.Mesh( geometry, material );
      point.position.x = this.state.coords[i][0];
      point.position.y = this.state.coords[i][1];
      point.position.z = this.state.coords[i][2];
      point.scale.x = .2;
      point.scale.y = .2;
      point.scale.z = .2;
      scene.add(point);
    }

    camera.position.z = 20;
    
    var animate = function () {
      requestAnimationFrame( animate );

      controls.update();

      raycaster.setFromCamera( mouse, camera );
      var intersects = raycaster.intersectObjects( scene.children );

      for ( var i = 0; i < intersects.length; i++ ) {

        intersects[ i ].object.material.color.set( 0xff0000 );
  
      }

      renderer.render( scene, camera );
    };

    animate();
  }

  

  render() {
    return <div></div>
  }

}
