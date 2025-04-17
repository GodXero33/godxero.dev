import * as THREE from './three/three.module.js';
import ScrollTimeLine from './scroll-timeline.js';
import createTimeline from './timeline.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.classList.add('three-renderer');

const scrollTimeLine = new ScrollTimeLine(5000);
const timeline = createTimeline(scene);

function threeSetup () {
	camera.position.z = 4;

	camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function animate () {
	scrollTimeLine.update();
	timeline.forEach((scrollObject) => scrollObject.update(scrollTimeLine.scrollProgress));
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

threeSetup();
scrollTimeLine.init(window);
animate();
