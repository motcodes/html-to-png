import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { TextureLoader } from 'three';

export function Box() {
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
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {imageUrl && (
        <Suspense fallback={<SimpleBox />}>
          <BoxExample position={[-1.2, 0, 0]} imageUrl={imageUrl} />
          <BoxExample position={[1.2, 0, 0]} imageUrl={imageUrl} />
        </Suspense>
      )}
    </Canvas>
  );
}
export function BoxExample(props) {
  const { imageUrl } = props;
  const texture = useLoader(TextureLoader, imageUrl);
  texture.offset.x = 0.1;
  texture.offset.y = -0.1;
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });
  // Return view, these are regular threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      // onPointerOver={(e) => setHover(true)}
      // onPointerOut={(e) => setHover(false)}
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
