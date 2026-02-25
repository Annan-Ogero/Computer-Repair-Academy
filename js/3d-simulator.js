// ============================================================
// 3D LAB SIMULATOR
// ============================================================

class LabSimulator {
    constructor() {
        this.container = document.getElementById('lab-3d-viewport');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1e1e32);

        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.currentTool = 'rotate';
        this.parts = [];

        this.initLights();
        this.initObjects();
        this.animate();

        this.container.addEventListener('mousedown', (e) => this.onMouseDown(e));
        window.addEventListener('resize', () => this.onResize());
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }

    initObjects() {
        // Create a simple box representing a computer case
        const geometry = new THREE.BoxGeometry(2, 3, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x33334d, transparent: true, opacity: 1 });
        this.computerCase = new THREE.Mesh(geometry, material);
        this.computerCase.userData = { name: 'Chassis / Case', info: 'The physical enclosure that holds all computer components.', voltage: 0 };
        this.scene.add(this.computerCase);
        this.parts.push(this.computerCase);

        // Add some "internal" components
        const mbGeom = new THREE.PlaneGeometry(1.8, 2.8);
        const mbMat = new THREE.MeshStandardMaterial({ color: 0x1b5e20, side: THREE.DoubleSide });
        this.motherboard = new THREE.Mesh(mbGeom, mbMat);
        this.motherboard.position.z = 0.45;
        this.motherboard.userData = { name: 'Motherboard', info: 'The main circuit board connecting all components.', voltage: 12 };
        this.computerCase.add(this.motherboard);
        this.parts.push(this.motherboard);

        // CPU
        const cpuGeom = new THREE.BoxGeometry(0.4, 0.4, 0.1);
        const cpuMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
        this.cpu = new THREE.Mesh(cpuGeom, cpuMat);
        this.cpu.position.set(0, 0.5, 0.05);
        this.cpu.userData = { name: 'CPU (Processor)', info: 'The brain of the computer that executes instructions.', voltage: 1.2 };
        this.motherboard.add(this.cpu);
        this.parts.push(this.cpu);

        // RAM
        const ramGeom = new THREE.BoxGeometry(0.1, 1.2, 0.2);
        const ramMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
        this.ram = new THREE.Mesh(ramGeom, ramMat);
        this.ram.position.set(0.4, 0, 0.1);
        this.ram.userData = { name: 'RAM Module', info: 'High-speed volatile memory for temporary data storage.', voltage: 1.35 };
        this.motherboard.add(this.ram);
        this.parts.push(this.ram);
    }

    onMouseDown(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.parts, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            this.handleInteraction(object);
        }
    }

    handleInteraction(object) {
        const data = object.userData;
        if (!data.name) return;

        // Update UI panels
        document.getElementById('lab-part-name').textContent = data.name;
        document.getElementById('lab-part-info').innerHTML = `<p>${data.info}</p>`;

        if (this.currentTool === 'identify') {
            window.app?.showToast(`Identified: ${data.name}`, 'info');
        } else if (this.currentTool === 'multimeter') {
            document.getElementById('lab-readings').classList.remove('hidden');
            document.getElementById('lab-reading-values').innerHTML = `
                <div class="reading-value">
                    <span>Voltage:</span>
                    <span class="val">${data.voltage}V</span>
                </div>
            `;
            window.app?.showToast(`Voltage reading: ${data.voltage}V`, 'warning');
        }
    }

    loadDevice(type) {
        const colors = {
            desktop: 0x33334d,
            laptop: 0x555555,
            motherboard: 0x1b5e20,
            cpu: 0xaaaaaa,
            gpu: 0x222222
        };
        this.computerCase.material.color.setHex(colors[type] || 0x33334d);
    }

    setTool(tool) {
        this.currentTool = tool;
        
        // Reset visual states
        this.computerCase.material.opacity = 1;
        this.computerCase.material.color.setHex(0x33334d);
        document.getElementById('lab-readings').classList.add('hidden');

        if (tool === 'xray') {
            this.computerCase.material.opacity = 0.3;
            window.app?.showToast('X-Ray Mode Enabled', 'info');
        } else if (tool === 'thermal') {
            this.computerCase.material.color.setHex(0xff4400);
            this.cpu.material.color.setHex(0xff0000);
            window.app?.showToast('Thermal Imaging Active', 'warning');
        }
    }

    onResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
