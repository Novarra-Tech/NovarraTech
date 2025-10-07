'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useTheme } from "next-themes";

const HomePageAnimation: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const { theme } = useTheme();

    // Store scene and renderer persistently across renders
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const textRef = useRef<THREE.Mesh | null>(null);

    useEffect(() => {
        init();
        return cleanup;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ✅ Update background color dynamically when theme changes
    useEffect(() => {
        if (sceneRef.current) {
            const bgColor = theme === "dark" ? 0x000000 : 0x7393B3;
            sceneRef.current.background = new THREE.Color(bgColor);
        }
    }, [theme]);

    const init = () => {
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const bgColor = theme === "dark" ? 0x000000 : 0x7393B3;
        scene.background = new THREE.Color(bgColor);

        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 6);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        rendererRef.current = renderer;
        mountRef.current?.appendChild(renderer.domElement);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.25;
        orbitControls.enableZoom = false;
        controlsRef.current = orbitControls;

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        const key = new THREE.DirectionalLight(0xffffff, 1.0);
        key.position.set(2, 3, 5);
        key.castShadow = true;
        scene.add(key);

        const rim = new THREE.DirectionalLight(0xffffff, 0.6);
        rim.position.set(-3, 2, -4);
        scene.add(rim);

        // Load text
        const fontLoader = new FontLoader();
        fontLoader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
            const textGeometry = new TextGeometry('Novarra', {
                font,
                size: 1,
                depth: 0.4,
                curveSegments: 6,
                bevelEnabled: false,
            });

            textGeometry.computeBoundingBox();
            if (textGeometry.boundingBox) {
                const center = new THREE.Vector3();
                textGeometry.boundingBox.getCenter(center);
                textGeometry.translate(-center.x, -center.y, -center.z);
            }

            const frontMat = new THREE.MeshPhongMaterial({
                color: 0x81a6cc,
                specular: 0x222222,
                shininess: 60,
            });

            const sideMat = new THREE.MeshPhongMaterial({
                color: 0xb5b5b5,
                specular: 0x111111,
                shininess: 20,
            });

            const helloWorldText = new THREE.Mesh(textGeometry, [frontMat, sideMat]);
            helloWorldText.castShadow = true;
            helloWorldText.position.set(0, 0.6, 0);
            textRef.current = helloWorldText;

            scene.add(helloWorldText);
        });

        window.addEventListener('resize', onWindowResize);
        animate();
    };

    const animate = () => {
        requestAnimationFrame(animate);

        if (textRef.current) {
            textRef.current.rotation.y += 0.005;
        }

        controlsRef.current?.update();
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    };

    const onWindowResize = () => {
    if (!cameraRef.current || !rendererRef.current) return;
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);

    if (textRef.current) {
        const scale = Math.max(0.5, Math.min(window.innerWidth / 1700, 2));
        textRef.current.scale.set(scale, scale, scale);
    }
};


    const cleanup = () => {
        window.removeEventListener('resize', onWindowResize);
        if (mountRef.current && rendererRef.current) {
            mountRef.current.removeChild(rendererRef.current.domElement);
        }
    };

    return <div ref={mountRef} style={{ width: '100%', height: '93vh', overflow: 'hidden' }} />;
};

export default HomePageAnimation;
