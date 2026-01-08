import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const container = document.getElementById('container-3d');

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop( animate );
container.appendChild(renderer.domElement);

window.addEventListener('resize', () => {

  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


// 1. Corregir posición de cámara (¡FUNDAMENTAL!)
camera.position.set(0, 0, 200);

// 2. Crear la forma del corazón (2D)
const heartShape = new THREE.Shape();
heartShape.moveTo( 25, 25 );
heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

const extrudeSettings = {
	depth: 8,
	bevelEnabled: true,
	bevelSegments: 2,
	steps: 2,
	bevelSize: 1,
	bevelThickness: 1
};

const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );

// 4. Centrar la geometría
// Esto es importante para que rote sobre su propio eje y no desde una esquina
geometry.center(); 

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); 
const heart = new THREE.Mesh(geometry, material);
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Luz general
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10); // Luz puntual para dar brillo
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
// 5. Orientación
heart.rotation.x = Math.PI; // Girar en X suele funcionar mejor para Shapes
scene.add(heart);

// 6. Animación
function animate() {
  heart.rotation.y += 0.01;
  renderer.render(scene, camera);
}