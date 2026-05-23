'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useTheme } from 'next-themes';

// ── Camera constants (FloatingNav.tsx must match) ─────────────────────────────
export const CAM_Z   = 10;
export const CAM_FOV = 50;

// ── Theme palettes ────────────────────────────────────────────────────────────
const DARK = {
    bg: 0x020b18,
    fog: 0x020b18,
    textFront: 0xf0f9ff,
    textSide:  0x0284c7,
    emissive: 0x0369a1, emissiveInt: 0.35,
    metalness: 0.5, roughness: 0.12,
    particleColor: 0x38bdf8,
    particleOp: 0.80,
    ringColor: 0x0ea5e9, ringOp: 0.40,
    ambColor: 0x071525, ambInt: 1.5,
    p1Color: 0x0ea5e9, p1Int: 16,
    p2Color: 0x22d3ee, p2Int: 8,
    p3Color: 0x7dd3fc, p3Int: 4,
};
const LIGHT = {
    bg: 0xf0f9ff,
    fog: 0xf0f9ff,
    textFront: 0x0c2340,
    textSide:  0x1d4ed8,
    emissive: 0x000000, emissiveInt: 0,
    metalness: 0.04, roughness: 0.55,
    particleColor: 0x2563eb,
    particleOp: 0.60,
    ringColor: 0x2563eb, ringOp: 0.25,
    ambColor: 0xffffff, ambInt: 10,
    p1Color: 0x0284c7, p1Int: 2,
    p2Color: 0x0891b2, p2Int: 1,
    p3Color: 0x3b82f6, p3Int: 0.5,
};

const HomePageAnimation: React.FC = () => {
    const mountRef     = useRef<HTMLDivElement | null>(null);
    const { theme }    = useTheme();

    const sceneRef     = useRef<THREE.Scene | null>(null);
    const rendererRef  = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef    = useRef<THREE.PerspectiveCamera | null>(null);
    const textGroupRef = useRef<THREE.Group | null>(null);
    const sphereRef    = useRef<THREE.Points | null>(null);
    const ringsRef     = useRef<THREE.Mesh[]>([]);
    const frameRef     = useRef<number>(0);
    const mouseRef     = useRef({ x: 0, y: 0 });

    // Live-update refs
    const frontMatRef   = useRef<THREE.MeshStandardMaterial | null>(null);
    const sideMatRef    = useRef<THREE.MeshStandardMaterial | null>(null);
    const particleMatRef= useRef<THREE.PointsMaterial | null>(null);
    const ringMatsRef   = useRef<THREE.MeshBasicMaterial[]>([]);
    const ambRef        = useRef<THREE.AmbientLight | null>(null);
    const p1Ref         = useRef<THREE.PointLight | null>(null);
    const p2Ref         = useRef<THREE.PointLight | null>(null);
    const p3Ref         = useRef<THREE.PointLight | null>(null);

    // ── Theme live-update ──────────────────────────────────────────────────────
    useEffect(() => {
        const p = theme === 'light' ? LIGHT : DARK;
        if (!sceneRef.current) return;

        sceneRef.current.background = new THREE.Color(p.bg);
        if (sceneRef.current.fog instanceof THREE.Fog)
            (sceneRef.current.fog as THREE.Fog).color.set(p.fog);

        if (frontMatRef.current) {
            frontMatRef.current.color.set(p.textFront);
            frontMatRef.current.metalness = p.metalness;
            frontMatRef.current.roughness = p.roughness;
            frontMatRef.current.emissive.set(p.emissive);
            frontMatRef.current.emissiveIntensity = p.emissiveInt;
            frontMatRef.current.needsUpdate = true;
        }
        if (sideMatRef.current) {
            sideMatRef.current.color.set(p.textSide);
            sideMatRef.current.needsUpdate = true;
        }
        if (particleMatRef.current) {
            particleMatRef.current.color.set(p.particleColor);
            particleMatRef.current.opacity = p.particleOp;
            particleMatRef.current.needsUpdate = true;
        }
        ringMatsRef.current.forEach(m => {
            m.color.set(p.ringColor);
            m.opacity = p.ringOp;
            m.needsUpdate = true;
        });
        if (ambRef.current) { ambRef.current.color.set(p.ambColor); ambRef.current.intensity = p.ambInt; }
        if (p1Ref.current)  { p1Ref.current.color.set(p.p1Color);  p1Ref.current.intensity  = p.p1Int; }
        if (p2Ref.current)  { p2Ref.current.color.set(p.p2Color);  p2Ref.current.intensity  = p.p2Int; }
        if (p3Ref.current)  { p3Ref.current.color.set(p.p3Color);  p3Ref.current.intensity  = p.p3Int; }
    }, [theme]);

    useEffect(() => { init(); return cleanup; /* eslint-disable-next-line */ }, []);

    const calcScale = (w: number) => Math.max(0.4, Math.min(w / 1600, 1.05));

    const init = () => {
        if (!mountRef.current) return;
        const W = window.innerWidth;
        const H = mountRef.current.offsetHeight;
        const p = DARK;

        // ── Scene ──────────────────────────────────────────────────────────
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(p.bg);
        scene.fog = new THREE.Fog(p.fog, 20, 55);
        sceneRef.current = scene;

        // ── Camera ─────────────────────────────────────────────────────────
        const camera = new THREE.PerspectiveCamera(CAM_FOV, W / H, 0.1, 200);
        camera.position.set(0, 0, CAM_Z);
        cameraRef.current = camera;

        // ── Renderer ───────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        rendererRef.current = renderer;
        mountRef.current.appendChild(renderer.domElement);

        // ── Lights ─────────────────────────────────────────────────────────
        const amb = new THREE.AmbientLight(p.ambColor, p.ambInt);
        ambRef.current = amb; scene.add(amb);

        const pl = (c: number, i: number, d: number, x: number, y: number, z: number) => {
            const l = new THREE.PointLight(c, i, d);
            l.position.set(x, y, z); scene.add(l); return l;
        };
        p1Ref.current = pl(p.p1Color, p.p1Int, 24, -4,  3.5, 5);
        p2Ref.current = pl(p.p2Color, p.p2Int, 18,  4.5,-2,  6);
        p3Ref.current = pl(p.p3Color, p.p3Int, 14,  0,   5, -3);

        const rim = new THREE.DirectionalLight(0xbae6fd, 1.0);
        rim.position.set(0, 8, -4); scene.add(rim);

        // ── Particle sphere — Fibonacci / golden-angle distribution ─────────
        const SPHERE_R = 3.6;
        const COUNT    = 1800;
        const positions = new Float32Array(COUNT * 3);
        const phi_g     = Math.PI * (3 - Math.sqrt(5)); // golden angle

        for (let i = 0; i < COUNT; i++) {
            const y     = 1 - (i / (COUNT - 1)) * 2;          // -1 → 1
            const r     = Math.sqrt(1 - y * y) * SPHERE_R;
            const theta = phi_g * i;
            positions[i * 3]     = Math.cos(theta) * r;
            positions[i * 3 + 1] = y * SPHERE_R;
            positions[i * 3 + 2] = Math.sin(theta) * r;
        }

        const sGeo = new THREE.BufferGeometry();
        sGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const sMat = new THREE.PointsMaterial({
            color: p.particleColor,
            size: 0.042,
            transparent: true,
            opacity: p.particleOp,
            sizeAttenuation: true,
        });
        particleMatRef.current = sMat;

        const sphere = new THREE.Points(sGeo, sMat);
        sphereRef.current = sphere;
        scene.add(sphere);

        // ── Orbital rings ───────────────────────────────────────────────────
        const addRing = (rx: number, ry: number, rz: number, op: number) => {
            const mat = new THREE.MeshBasicMaterial({
                color: p.ringColor, transparent: true, opacity: op * p.ringOp,
            });
            ringMatsRef.current.push(mat);
            const mesh = new THREE.Mesh(
                new THREE.TorusGeometry(SPHERE_R + 0.55, 0.012, 6, 120),
                mat
            );
            mesh.rotation.set(rx, ry, rz);
            scene.add(mesh);
            ringsRef.current.push(mesh);
        };

        addRing(Math.PI / 2.2, 0.3,  0,           1.0); // main ring
        addRing(Math.PI / 4,   1.0,  0.5,         0.65); // tilted
        addRing(1.2,           0.5,  Math.PI / 3, 0.45); // diagonal

        // ── Text group ──────────────────────────────────────────────────────
        const textGroup = new THREE.Group();
        textGroup.scale.setScalar(calcScale(W));
        scene.add(textGroup);
        textGroupRef.current = textGroup;

        const fontLoader = new FontLoader();
        fontLoader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
            const geo = new TextGeometry('Novarra', {
                font, size: 1.0, depth: 0.28, curveSegments: 12,
                bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.026, bevelSegments: 5,
            });
            geo.computeBoundingBox();
            if (geo.boundingBox) {
                const c = new THREE.Vector3();
                geo.boundingBox.getCenter(c);
                geo.translate(-c.x, -c.y, -c.z);
            }

            const front = new THREE.MeshStandardMaterial({
                color: p.textFront,
                metalness: p.metalness, roughness: p.roughness,
                emissive: new THREE.Color(p.emissive),
                emissiveIntensity: p.emissiveInt,
            });
            const side = new THREE.MeshStandardMaterial({
                color: p.textSide, metalness: 0.75, roughness: 0.25,
            });
            frontMatRef.current = front;
            sideMatRef.current  = side;

            const mesh = new THREE.Mesh(geo, [front, side]);
            mesh.position.z = 0.6; // in front of sphere center
            textGroup.add(mesh);
        });

        // ── Events ──────────────────────────────────────────────────────────
        const onMove = (e: MouseEvent) => {
            mouseRef.current.x =  (e.clientX / W - 0.5) * 2;
            mouseRef.current.y =  (e.clientY / H - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('resize', onResize);
        animate();
    };

    const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        const t = Date.now() * 0.001;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Camera parallax
        if (cameraRef.current) {
            cameraRef.current.position.x += (mx * 0.4 - cameraRef.current.position.x) * 0.04;
            cameraRef.current.position.y += (-my * 0.2 - cameraRef.current.position.y) * 0.04;
            cameraRef.current.lookAt(0, 0, 0);
        }

        // Sphere slow rotation
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.0018;
            sphereRef.current.rotation.x += 0.0004;
        }

        // Rings — each at its own rate
        const r = ringsRef.current;
        if (r[0]) r[0].rotation.z += 0.0025;
        if (r[1]) r[1].rotation.x += 0.0018;
        if (r[2]) r[2].rotation.y += 0.0012;

        // Text gentle float + mouse tilt
        if (textGroupRef.current) {
            textGroupRef.current.rotation.y = mx * 0.05;
            textGroupRef.current.rotation.x = -my * 0.025;
            textGroupRef.current.position.y = Math.sin(t * 0.42) * 0.06;
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current)
            rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    const onResize = () => {
        if (!cameraRef.current || !rendererRef.current || !mountRef.current) return;
        const W = window.innerWidth;
        const H = mountRef.current.offsetHeight;
        cameraRef.current.aspect = W / H;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(W, H);
        if (textGroupRef.current) textGroupRef.current.scale.setScalar(calcScale(W));
    };

    const cleanup = () => {
        cancelAnimationFrame(frameRef.current);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', () => {});
        if (mountRef.current && rendererRef.current?.domElement)
            mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current?.dispose();
    };

    return <div ref={mountRef} style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'block' }} />;
};

export default HomePageAnimation;
