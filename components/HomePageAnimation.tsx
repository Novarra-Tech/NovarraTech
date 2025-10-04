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
  let helloWorldText: THREE.Mesh | null = null;

  useEffect(() => {
    init();
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = () => {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    mountRef.current?.appendChild(renderer.domElement);

    // Controls
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.25;
    orbitControls.screenSpacePanning = false;
    orbitControls.enableZoom = false;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(2, 3, 5);
    key.castShadow = true;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 0.6);
    rim.position.set(-3, 2, -4);
    scene.add(rim);

    // 3D Text
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Novarra', {
        font,
        size: 1,
        depth: 0.4,
        curveSegments: 6,
        bevelEnabled: false
      });

      // Normalize/center and recompute normals
      textGeometry.computeBoundingBox();
      if (textGeometry.boundingBox) {
        const center = new THREE.Vector3();
        textGeometry.boundingBox.getCenter(center);
        textGeometry.translate(-center.x, -center.y, -center.z);
      }
      textGeometry.computeVertexNormals(); // important for solid lighting

      // OPAQUE materials (no transparency, front faces only)
      const frontMat = new THREE.MeshPhongMaterial({
        color: 0x81a6ccff,
        specular: 0x222222,
        shininess: 60,
        side: THREE.FrontSide, // do not render back faces
        transparent: false,
        depthTest: true,
        depthWrite: true
      });

      const sideMat = new THREE.MeshPhongMaterial({
        color: 0xb5b5b5,       // subtle contrast for the sides
        specular: 0x111111,
        shininess: 20,
        side: THREE.FrontSide,
        transparent: false,
        depthTest: true,
        depthWrite: true
      });

      // TextGeometry defines groups for front/sides -> pass an array
      helloWorldText = new THREE.Mesh(textGeometry, [frontMat, sideMat]);
      helloWorldText.castShadow = true;
      helloWorldText.receiveShadow = false;
      helloWorldText.position.set(0, 0.6, 0);
      scene.add(helloWorldText);
    });

    window.addEventListener('resize', onWindowResize, false);
    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);

    if (helloWorldText) {
      helloWorldText.rotation.y += 0.005;
    }

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
    if (mountRef.current && renderer) {
      mountRef.current.removeChild(renderer.domElement);
    }
  };

  return (
    <div ref={mountRef} style={{ width: '100%', height: '93vh', overflow: 'hidden' }} />
  );
};

export default HomePageAnimation;
