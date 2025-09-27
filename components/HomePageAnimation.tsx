"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default function HomePageAnimation() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let renderer: THREE.WebGLRenderer,
            scene: THREE.Scene,
            camera: THREE.PerspectiveCamera,
            controls: TrackballControls,
            mesh: THREE.Mesh,
            uniforms: any;

        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;

        const loader = new FontLoader();
        loader.load("fonts/Kode Mono SemiBold_Regular.json", function (font) {
            init(font);
        });

        function init(font) {
            camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 1, 10000);
            camera.position.set(-100, 100, 200);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x050505);

            let geometry = new TextGeometry("Infinite Innovations. Endless Possibilities. Limitless Future.", {
                font,
                size: 40,
                depth: 5,
                curveSegments: 3,
                bevelThickness: 2,
                bevelSize: 1,
                bevelEnabled: true,
            });

            geometry.center();

            const tessellateModifier = new TessellateModifier(8, 6);
            geometry = tessellateModifier.modify(geometry);

            const numFaces = geometry.attributes.position.count / 3;
            const colors = new Float32Array(numFaces * 3 * 3);
            const displacement = new Float32Array(numFaces * 3 * 3);

            const color = new THREE.Color();

            for (let f = 0; f < numFaces; f++) {
                const index = 9 * f;

                const h = 0.2 * Math.random();
                const s = 0.5 + 0.5 * Math.random();
                const l = 0.5 + 0.5 * Math.random();

                color.setHSL(h, s, l);

                const d = 10 * (0.5 - Math.random());

                for (let i = 0; i < 3; i++) {
                    colors[index + 3 * i] = color.r;
                    colors[index + 3 * i + 1] = color.g;
                    colors[index + 3 * i + 2] = color.b;

                    displacement[index + 3 * i] = d;
                    displacement[index + 3 * i + 1] = d;
                    displacement[index + 3 * i + 2] = d;
                }
            }

            geometry.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute(
                "displacement",
                new THREE.BufferAttribute(displacement, 3)
            );

            uniforms = {
                amplitude: { value: 0.0 },
            };

            const shaderMaterial = new THREE.ShaderMaterial({
                uniforms,
                vertexShader: `
          uniform float amplitude;
          attribute vec3 displacement;
          attribute vec3 customColor;
          varying vec3 vColor;

          void main() {
            vec3 newPosition = position + normal * amplitude * displacement;
            vColor = customColor;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `,
                fragmentShader: `
          varying vec3 vColor;

          void main() {
            gl_FragColor = vec4(vColor, 1.0);
          }
        `,
            });

            mesh = new THREE.Mesh(geometry, shaderMaterial);
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(WIDTH, HEIGHT);
            renderer.setAnimationLoop(animate);

            if (containerRef.current) {
                containerRef.current.innerHTML = "";
                containerRef.current.appendChild(renderer.domElement);
            }

            controls = new TrackballControls(camera, renderer.domElement);


            window.addEventListener("resize", onWindowResize);
        }

        function onWindowResize() {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            render();
        }

        function render() {
            const time = Date.now() * 0.001;
            if (uniforms) uniforms.amplitude.value = 1.0 + Math.sin(time * 0.5);
            if (controls) controls.update();
            if (renderer && scene && camera) renderer.render(scene, camera);
        }

        return () => {
            window.removeEventListener("resize", onWindowResize);
            if (renderer) renderer.dispose();
            if (containerRef.current) containerRef.current.innerHTML = "";
        };
    }, []);

    return <div ref={containerRef} className="w-full h-screen" />;
}
