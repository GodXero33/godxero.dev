import * as THREE from './three/three.module.js';

export default class ScrollObject {
	constructor ({
		id,
		position = new THREE.Vector3(0, 0, 0),
		targetPosition = new THREE.Vector3(0, 0, 0),
		rotation = new THREE.Vector3(0, 0, 0),
		targetRotation = new THREE.Vector3(0, 0, 0),
		start = 0,
		mesh,
		end = 1
	}) {
		this.id = id;
		this.position = position;
		this.targetPosition = targetPosition;
		this.rotation = rotation;
		this.targetRotation = targetRotation;
		this.mesh = mesh;
		this.start = start;
		this.end = end;
	}

	update (scrollProgress) {
		if (!this.mesh) return;

		if (scrollProgress < this.start) scrollProgress = this.start;
		if (scrollProgress > this.end) scrollProgress = this.end;

		const normalizedProgress = (scrollProgress - this.start) / (this.end - this.start);

		this.mesh.position.x = THREE.MathUtils.lerp(this.position.x, this.targetPosition.x, normalizedProgress);
		this.mesh.position.y = THREE.MathUtils.lerp(this.position.y, this.targetPosition.y, normalizedProgress);
		this.mesh.position.z = THREE.MathUtils.lerp(this.position.z, this.targetPosition.z, normalizedProgress);

		this.mesh.rotation.x = THREE.MathUtils.lerp(this.rotation.x, this.targetRotation.x, normalizedProgress);
		this.mesh.rotation.y = THREE.MathUtils.lerp(this.rotation.y, this.targetRotation.y, normalizedProgress);
		this.mesh.rotation.z = THREE.MathUtils.lerp(this.rotation.z, this.targetRotation.z, normalizedProgress);
	}
}
