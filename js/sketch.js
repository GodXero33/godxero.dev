import * as THREE from './three/three.module.js';
import ScrollTimeLine from './scroll-timeline.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.classList.add('three-renderer');

const scrollTimeLine = new ScrollTimeLine(5000);
const cubes = [];

scrollTimeLine.scrollPositionCallback = (scrollProgress) => {
	cubes.forEach((cube, i) => {
		const localProgress = Math.max(0, scrollProgress * 5 - i);
		cube.position.y = -5 + Math.min(localProgress * 10, 5);
	});
}

function createCube (x, y, z, color = 0x00ff00) {
	const geo = new THREE.BoxGeometry(1, 1, 1);
	const mat = new THREE.MeshBasicMaterial({ color });
	const mesh = new THREE.Mesh(geo, mat);
	mesh.position.set(x, y, z);
	scene.add(mesh);
	cubes.push(mesh);
}

function createTimeline () {
	for (let i = 0; i < 5; i++) {
		createCube(0, -5, -5 + i * 3, 0xff0000);
	}
}

function threeSetup () {
	camera.position.z = 10;
}

function animate () {
	scrollTimeLine.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

threeSetup();
createTimeline();
scrollTimeLine.init(window);
animate();
