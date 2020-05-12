import React from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coords: props.location.state.coords
    }
  }

  componentDidMount() {

    console.log("Rendered");
    console.log(typeof this.state.coords);

    var scene = new THREE.Scene();
    var raycaster = new THREE.Raycaster();

    var mouse = new THREE.Vector2();

    var onMouseMove = function(e) {

      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
    
      mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    
    }

    window.addEventListener( 'click', onMouseMove, false );

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 12000 );
    
    var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var controls = new OrbitControls( camera, renderer.domElement );
    
    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
    
    for (let i = 0; i < this.state.coords.length; i++) {
      var geometry = new THREE.SphereGeometry();
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var point = new THREE.Mesh( geometry, material );
      point.position.x = this.state.coords[i][0];
      point.position.y = this.state.coords[i][1];
      point.position.z = this.state.coords[i][2];
      point.scale.x = 16;
      point.scale.y = 16;
      point.scale.z = 16;
      scene.add(point);
    }

    //camera.position.z = 51;
    camera.position.set(12000, 12000, 12000);
    //camera.up.set( 0, 0, 1 );
    camera.lookAt(0, 0, 0);
    
    var animate = function () {
      requestAnimationFrame( animate );

      controls.update();

      raycaster.setFromCamera( mouse, camera );
      var intersects = raycaster.intersectObjects( scene.children );

      for ( var i = 0; i < intersects.length; i++ ) {

        
        intersects[i].object.material.color.set( 0xffffff );
  
      }

      renderer.render( scene, camera );
    };

    animate();
  }

  

  render() {
    return <div></div>
  }

}
