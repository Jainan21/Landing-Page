import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 10, 15);
camera.lookAt(5, 2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

// Ground
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0xf0f0f0 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Truck - Transparent Container
const containerMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
});
const container = new THREE.Mesh(
    new THREE.BoxGeometry(10, 4, 4),
    containerMaterial
);
container.position.set(5, 2, 0);
scene.add(container);

// Truck Cab
const cab = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2.5, 3),
    new THREE.MeshStandardMaterial({ color: 0x00cc00 })
);
cab.position.set(-1, 1.25, 0);
scene.add(cab);

// Wheels
function createWheel(x, z) {
    const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32),
        new THREE.MeshStandardMaterial({ color: 0x006600 })
    );
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, 0.5, z);
    scene.add(wheel);
}
[0, 2, 4, 6, 8].forEach(x => [-1.8, 1.8].forEach(z => createWheel(x, z)));

// Function to add stacked boxes
function stackBoxes(startX, startY, startZ, countX, countY, countZ, color) {
    const material = new THREE.MeshStandardMaterial({ color });
    for (let x = 0; x < countX; x++) {
        for (let y = 0; y < countY; y++) {
            for (let z = 0; z < countZ; z++) {
                const box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    material
                );
                box.position.set(startX + x, startY + y, startZ + z);
                scene.add(box);
            }
        }
    }
}

// Add boxes by type (📦 mimic your image)
stackBoxes(0.5, 0.5, -1.5, 2, 2, 2, 0xffd700);  // mì
stackBoxes(2.5, 0.5, -1.5, 2, 2, 2, 0xffa500);  // xúc xích
stackBoxes(4.5, 0.5, -1.5, 4, 2, 2, 0x228B22);  // nước suối

// Animate
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
