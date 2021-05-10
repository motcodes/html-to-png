import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useControls } from 'leva';

extend({ OrbitControls });

export function BoxLarge() {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (location.state.imageUrl) {
      setImageUrl(location.state.imageUrl);
    }
  }, [location.state.imageUrl]);

  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <CameraController />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {imageUrl && (
        <Suspense fallback={<SimpleBox />}>
          <BoxExample position={[0, 0, 0]} imageUrl={imageUrl} />
        </Suspense>
      )}
    </Canvas>
  );
}
export function BoxExample(props) {
  const { imageUrl } = props;
  const texture = useLoader(TextureLoader, imageUrl);

  const { textureOffsetX, textureOffsetY } = useControls({
    textureOffsetX: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    textureOffsetY: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  texture.offset.x = textureOffsetX; // 0.0 - 1.0
  texture.offset.y = textureOffsetY; // 0.0 - 1.0
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) {
      document.body.style = 'cursor: pointer;';
    } else {
      document.body.style = 'cursor: default;';
    }
  }, [hover]);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => {
    // mesh.current.rotation.x += 0.0001;
    mesh.current.rotation.y += 0.001;
  });
  // Return view, these are regular threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 3.5 : 3}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} attach="material" />
    </mesh>
  );
}

const SimpleBox = (props) => {
  const mesh = useRef();
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
