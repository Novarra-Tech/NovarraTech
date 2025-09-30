'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const HomePageAnimation: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    // Scene objects
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let orbitControls: OrbitControls;
    let torus: THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial>;
    let spheres: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>[] = [];
    let helloWorldText: THREE.Mesh<TextGeometry, THREE.MeshStandardMaterial> | null = null;

    useEffect(() => {
        init();
        return () => {
            cleanup();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const init = () => {
        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Camera
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 6); // Slightly above and away
        camera.lookAt(0, 0, 0);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current?.appendChild(renderer.domElement);

        // OrbitControls
        orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.25;
        orbitControls.screenSpacePanning = false;
        orbitControls.enableZoom = false;

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0, 10, 0);
        scene.add(pointLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 1, 1).normalize();
        scene.add(directionalLight);

        // 3D Text
        const fontLoader = new FontLoader();
        fontLoader.load('/fonts/Kode Mono SemiBold_Regular.json', (font) => {
            const textGeometry = new TextGeometry('Novarra', {
                font,
                size: 1,
                depth: 1,
                curveSegments: 1,
                bevelEnabled: false,
                bevelThickness: 0.1,
                bevelSize: 0.1,
                bevelOffset: 0,
                bevelSegments: 5,
            });

            // Center the text
            textGeometry.computeBoundingBox();
            if (textGeometry.boundingBox) {
                const centerX = (textGeometry.boundingBox.max.x + textGeometry.boundingBox.min.x) / 2;
                const centerY = (textGeometry.boundingBox.max.y + textGeometry.boundingBox.min.y) / 2;
                const centerZ = (textGeometry.boundingBox.max.z + textGeometry.boundingBox.min.z) / 2;
                textGeometry.translate(-centerX, -centerY, -centerZ);
            }

            const textMaterial = new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0xFFFFFF,
                emissiveIntensity: 0.5
            });

            helloWorldText = new THREE.Mesh(textGeometry, textMaterial);
            helloWorldText.position.set(0, 1, 0);
            scene.add(helloWorldText);
        });

        window.addEventListener('resize', onWindowResize, false);
        animate();
    };

    const animate = () => {
        requestAnimationFrame(animate);

        // Rotate spheres around center (circular motion)
        const time = Date.now() * 0.001;
        if (helloWorldText) helloWorldText.rotation.y += 0.005;


        orbitControls.update();
        renderer.render(scene, camera);
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const cleanup = () => {
        window.removeEventListener('resize', onWindowResize);
        if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };

    return <div ref={mountRef} style={{ width: '100%', height: '93vh', overflow: 'hidden' }} />;
};

export default HomePageAnimation;
