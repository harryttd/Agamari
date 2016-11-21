import store from '../store';
import { scene, camera, canvas, renderer, world, groundMaterial, playerID, myColors } from './main';

const THREE = require('three');
const CANNON = require('../../public/cannon.min.js');

let controls;

export const Food = function( foodObj ) {
	this.foodData = foodObj;
	this.mesh;
	this.cannonMesh;
	var scope = this;


	if(foodObj.type == "sphere"){
		// create THREE object
		var ball_geometry = new THREE.TetrahedronGeometry( 2, 1 );
		var ball_material = new THREE.MeshPhongMaterial( {color: myColors["blue"], shading:THREE.FlatShading} );

		// create Cannon object
		var sphereShape = new CANNON.Sphere(2);
		scope.cannonMesh = new CANNON.Body({mass: 0, material: groundMaterial, shape: sphereShape});
	}


	this.init = function() {
		// mesh the ball geom and mat
		scope.mesh = new THREE.Mesh( ball_geometry, ball_material );
		scope.mesh.castShadow = true;

		scope.mesh.position.x = foodData.x;
		scope.mesh.position.y = 12;
		scope.mesh.position.z = foodData.z;

		scene.add( scope.mesh );


		// add Cannon box
		scope.cannonMesh.position.x = scope.mesh.position.x;
		scope.cannonMesh.position.z = scope.mesh.position.y;
		scope.cannonMesh.position.y = scope.mesh.position.z;
		scope.cannonMesh.quaternion.x = scope.mesh.quaternion.x;
		scope.cannonMesh.quaternion.y = scope.mesh.quaternion.y;
		scope.cannonMesh.quaternion.z = scope.mesh.quaternion.z;
		scope.cannonMesh.quaternion.w = scope.mesh.quaternion.w;

		world.add(scope.cannonMesh);

	};

	this.setOrientation = function( position, rotation ) {
		if ( scope.mesh ) {
			scope.mesh.position.copy( position );
			scope.mesh.rotation.x = rotation.x;
			scope.mesh.rotation.y = rotation.y;
			scope.mesh.rotation.z = rotation.z;
		}
	};

	// Kenty: I added this method to get a player's positional data
	this.getPlayerData = function() {
		return {
				x: scope.mesh.position.x,
				y: scope.mesh.position.y,
				z: scope.mesh.position.z,
				rx: scope.mesh.rotation.x,
				ry: scope.mesh.rotation.y,
				rz: scope.mesh.rotation.z
		};
	};
};

export {controls};