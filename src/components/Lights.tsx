import { Environment, Lightformer } from "@react-three/drei";

export default function Lights({ boost = 1 }: { boost?: number }) {
  return (
    <>
      {/* Global fill */}
      <ambientLight intensity={0.18 * boost} />
      {/* Soft sky/ground balance so the model lifts without flattening */}
      <hemisphereLight
        intensity={0.25 * boost}
        color={"#ffffff"}
        groundColor={"#1a1a1a"}
      />

      <Environment background={false} blur={0.45}>
        {/* Key: brighter and a bit closer */}
        <Lightformer
          form="rect"
          intensity={3.6 * boost}
          color="#ffffff"
          scale={[7, 3.5, 1]}
          position={[0, 1.6, 4.5]}
          rotation={[-0.15, 0, 0]}
        />

        {/* Specular kicker: thin, bright strip to punch highlights */}
        <Lightformer
          form="rect"
          intensity={16 * boost}
          color="#ffffff"
          scale={[2.2, 0.5, 1]}
          position={[0, 0.6, 2.2]}
          rotation={[-0.05, 0, 0]}
        />

        {/* Top-back rim: stronger for a crisper edge light */}
        <Lightformer
          form="rect"
          intensity={14 * boost}
          color="#ffffff"
          scale={[7, 2, 1]}
          position={[0, 6, -2]}
          rotation={[Math.PI / 2.4, 0, 0]}
        />

        {/* Side fills: a touch brighter/symmetrical */}
        <Lightformer
          form="rect"
          intensity={5.5 * boost}
          color="#ffffff"
          scale={[4, 4, 1]}
          position={[-6, 0, 2]}
          rotation={[0, Math.PI / 3, 0]}
        />
        <Lightformer
          form="rect"
          intensity={5.5 * boost}
          color="#ffffff"
          scale={[4, 4, 1]}
          position={[6, 0, 2]}
          rotation={[0, -Math.PI / 3, 0]}
        />
      </Environment>
    </>
  );
}
