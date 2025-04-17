import * as THREE from './three/three.module.js';
import ScrollObject from './scroll-object.js';

function getMeshes (scene) {
	const meshes = [];

	for (let a = 0; a < 4; a++) {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: Math.floor(Math.random() * 256 ** 3) });
		const mesh = new THREE.Mesh(geometry, material);

		scene.add(mesh);
		meshes.push(mesh);
	}

	return meshes;
}

export default function createTimeline (scene) {
	const scrollObjects = [];
	const meshes = getMeshes(scene);

	scrollObjects.push(new ScrollObject({
		id: 'cube1',
		position: new THREE.Vector3(0, 0, 0),
		targetPosition: new THREE.Vector3(0, 4, 0),
		rotation: new THREE.Vector3(0, 0, 0),
		targetRotation: new THREE.Vector3(0, Math.PI, 0),
		start: 0,
		end: 0.4,
		mesh: meshes[0]
	}));

	scrollObjects.push(new ScrollObject({
		id: 'cube2',
		position: new THREE.Vector3(0, -2, 0),
		targetPosition: new THREE.Vector3(0, 2, 0),
		rotation: new THREE.Vector3(0, 0, 0),
		targetRotation: new THREE.Vector3(0, -Math.PI * 2, 0),
		start: 0.3,
		end: 0.7,
		mesh: meshes[1]
	}));

	scrollObjects.push(new ScrollObject({
		id: 'cube3',
		position: new THREE.Vector3(0, -4, 0),
		targetPosition: new THREE.Vector3(0, 0, 0),
		rotation: new THREE.Vector3(0, 0, 0),
		targetRotation: new THREE.Vector3(0, 0, 0),
		start: 0.65,
		end: 1,
		mesh: meshes[2]
	}));

	scrollObjects.push(new ScrollObject({
		id: 'cube3',
		position: new THREE.Vector3(0, -4, 0),
		targetPosition: new THREE.Vector3(2, 0, 0),
		rotation: new THREE.Vector3(0, 0, 0),
		targetRotation: new THREE.Vector3(0, 0, 0),
		start: 0.65,
		end: 1,
		mesh: meshes[3]
	}));

	console.log(scrollObjects);
	return scrollObjects;
}
