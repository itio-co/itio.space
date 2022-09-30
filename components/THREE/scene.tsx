import { Suspense } from "react";
import {Canvas, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

import Model from "./model";

const deg2rad = degrees => degrees * (Math.PI / 180);

export const Scene = () => {
  useThree(({camera}) => {
    camera.rotation.set(deg2rad(30), 0, 0);
    camera.position.set(0, 2, 4);
  });

  return (
    <>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight intensity={1.2} position={[5, 3, 5]} />
        <Model
          rotation={[0, -0.75, 0]}
          scale={0.25}
          position={[0, -1, 0]}
        />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.1}
      />
    </>
  );
};
