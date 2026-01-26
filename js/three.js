import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * GLOBAL
 */
const CONFIG = {
    camera: { 
        pos: new THREE.Vector3(4200, 200, 0), 
        fov: 60 
    },
    colors: {
        background: 0x020005,
        brain: 0xd77dde,
        palette: [0xd77dde, 0xb46bd8, 0x7c40d6, 0xfbcfe8]
    },
    brain: {
        path: '/juanjg-portfolio/brain.obj',
        baseOpacity: 0.08,
        lerpSpeed: 0.05
    }
};

/**
 * PULSES
 */
class NeuralPulse {
    constructor(startPos, direction, length, depth, color, isAutomatic) {
        this.progress = 0;
        this.isFinished = false;
        this.depth = depth;
        this.color = color;
        this.length = length;
        this.direction = direction.normalize();
        this.isAutomatic = isAutomatic;
        const points = this._generatePoints(startPos);
        this.curve = new THREE.CatmullRomCurve3(points);
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.curve.getPoints(40));
        this.geometry.setDrawRange(0, 0);
        this.material = new THREE.LineBasicMaterial({ 
            color, transparent: true, opacity: 1, blending: THREE.AdditiveBlending 
        });
        this.mesh = new THREE.Line(this.geometry, this.material);
    }

    _generatePoints(start) {
        const pts = [];
        const jitter = this.isAutomatic ? 70 : 300;
        for (let i = 0; i < 6; i++) {
            const p = start.clone().add(this.direction.clone().multiplyScalar((this.length / 5) * i));
            if (i > 0) p.add(new THREE.Vector3((Math.random()-0.5)*jitter, (Math.random()-0.5)*jitter, (Math.random()-0.5)*jitter));
            pts.push(p);
        }
        return pts;
    }

    update(speed, pulseManager) {
        if (this.progress < 1) {
            this.progress += speed;
            this.geometry.setDrawRange(0, Math.floor(this.progress * 41));
        } else if (!this.isFinished) {
            this.isFinished = true;
            if (this.depth > 0) this.split(pulseManager);
        }
    }

    split(pulseManager) {
        const endPos = this.curve.getPoint(1);
        for (let i = 0; i < (this.isAutomatic ? 1 : 2); i++) {
            const axis = new THREE.Vector3(Math.random() - 0.5, 1, Math.random() - 0.5);
            const newDir = this.direction.clone().applyAxisAngle(axis, 0.8);
            const branch = new NeuralPulse(endPos, newDir, this.length * 0.7, this.depth - 1, this.color, this.isAutomatic);
            pulseManager.activeBranches.push(branch);
            pulseManager.group.add(branch.mesh);
        }
    }
}

/**
 * EXPERIENCE
 */
const Experience = {
    init() {
        this.container = document.getElementById('container-3d');
        this.clock = new THREE.Clock();
        this.pulses = [];
        this.brainMesh = null;
        this.brainIntensity = CONFIG.brain.baseOpacity;
        this.isLeftMouseDown = false;
        this.autoTimer = 0;

        this._setupScene();
        this._setupPostProcessing();
        this._loadModel();
        this._addEventListeners();
        this._animate();
    },

    _setupScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, window.innerWidth / window.innerHeight, 1, 50000);
        this.camera.position.copy(CONFIG.camera.pos);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(CONFIG.colors.background, 0.2); 
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = 1.6;
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.04;
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.maxDistance = 4000;
        this.controls.minDistance = 100;
        this.controls.mouseButtons = {
            LEFT: null, 
            MIDDLE: null,
            RIGHT: THREE.MOUSE.ROTATE
        };
    },

    _setupPostProcessing() {
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        const bloom = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight), 
            1.9, 0.4, 0.1
        );
        this.composer.addPass(bloom);
    },

    _loadModel() {
        this.brainMaterial = new THREE.MeshBasicMaterial({
            color: CONFIG.colors.brain,
            wireframe: true,
            transparent: true,
            opacity: CONFIG.brain.baseOpacity
        });

        new OBJLoader().load(CONFIG.brain.path, (obj) => {
            obj.traverse(child => {
                if (child.isMesh) child.material = this.brainMaterial;
            });
            obj.scale.setScalar(10);
            this.brainMesh = obj;
            this.scene.add(obj);
        });
    },

    createPulse(isAutomatic = false) {
        const group = new THREE.Group();
        const color = new THREE.Color(CONFIG.colors.palette[Math.floor(Math.random() * CONFIG.colors.palette.length)]);
        const pulseData = { group, activeBranches: [], fade: 1.0 };
        const length = isAutomatic ? 450 : 3200;
        this.brainIntensity = isAutomatic ? 0.18 : 0.30;

        for (let i = 0; i < (isAutomatic ? 2 : 5); i++) {
            const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            const root = new NeuralPulse(new THREE.Vector3(0,0,0), dir, length, 3, color, isAutomatic);
            pulseData.activeBranches.push(root);
            group.add(root.mesh);
        }
        this.scene.add(group);
        this.pulses.push(pulseData);
    },

    _addEventListeners() {
        this.container.addEventListener('contextmenu', (e) => e.preventDefault());
        window.addEventListener('mousedown', (e) => { if (e.button === 0) this.isLeftMouseDown = true; });
        window.addEventListener('mouseup', (e) => { if (e.button === 0) this.isLeftMouseDown = false; });
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.composer.setSize(window.innerWidth, window.innerHeight);
        });
    },

    _animate() {
        requestAnimationFrame(() => this._animate());
        const delta = this.clock.getDelta();

        if (this.brainMesh) {
            this.brainIntensity = THREE.MathUtils.lerp(this.brainIntensity, CONFIG.brain.baseOpacity, CONFIG.brain.lerpSpeed);
            this.brainMaterial.opacity = this.brainIntensity;
        }

        this.autoTimer += delta;
        if (this.autoTimer > 2.0) {
            this.createPulse(true);
            this.autoTimer = 0;
        }

        if (this.isLeftMouseDown && Math.random() > 0.85) this.createPulse(false);

        this._updatePulses();
        this.controls.update();
        this.composer.render();
    },

    _updatePulses() {
        for (let i = this.pulses.length - 1; i >= 0; i--) {
            const p = this.pulses[i];
            p.activeBranches.forEach(b => b.update(0.12, p));
            p.fade -= 0.015;
            if (p.fade <= 0) {
                this.scene.remove(p.group);
                p.group.traverse(obj => {
                    if (obj.geometry) obj.geometry.dispose();
                    if (obj.material) obj.material.dispose();
                });
                this.pulses.splice(i, 1);
            } else {
                p.group.traverse(c => { if (c.material) c.material.opacity = p.fade; });
            }
        }
    }
};

Experience.init();