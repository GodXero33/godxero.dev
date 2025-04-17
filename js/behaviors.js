const moveUp = (scrollObject, progress) => {
	scrollObject.mesh.position.y = scrollObject.position.y + progress * 5;
};

const rotate = (scrollObject, progress) => {
	scrollObject.mesh.rotation.y =  scrollObject.rotation.y + progress * Math.PI;
};

const colorChange = (scrollObject, progress) => {
	scrollObject.mesh.material.color.setHSL(progress, 1, 0.5);
};

export {
	moveUp,
	rotate,
	colorChange
};
