import * as THREE from 'three';

let start, recording, width, height;

//some THREE.js "boilerplate"

export const scene = new THREE.Scene();
scene.background = null;

export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    2000,
    //400
);

export const renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

var isMobile = false;

function resize() {
    const rect = renderer.domElement.getBoundingClientRect();
    const w = rect.width,
        h = rect.height;

    camera.aspect = w / h;
    camera.far = 2000;
    camera.updateProjectionMatrix();

    isMobile = w < h;

    renderer.setSize(w, h);
}
window.addEventListener('resize', resize);

function loop(duration = 3, init = () => {}, options = {}) {
    width = options.width || 1920;
    height = options.height || 1080;

    let update = init(scene, camera, renderer) ?? (() => {});

    let animate = () => {
        requestAnimationFrame(animate);

        const now = (performance || Date).now();
        let firstFrame;

        if (start === undefined) {
            start = now;
            firstFrame = true;
        } else {
            firstFrame = false;
        }
        const elapsed = now - start;

        //t = loop position in the range 0 - 1
        const t = (elapsed % (duration * 1000)) / (duration * 1000);

        update(t, isMobile);

        renderer.render(scene, camera);
    };
    resize();
    animate();

    if (options.done) options.done();
}

export { loop };
