'use client'
import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

interface RotatingModelProps {
  url: string
}

function RotatingModel({ url }: RotatingModelProps) {
  // 使用 useRef 获取模型的引用，指定类型为 Group | null
  const modelRef = useRef<Group>(null)

  // 加载 GLB 文件
  const { scene } = useGLTF('/3d-crypto-statistics.glb')

  // 添加垂直旋转动画
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001 // 控制旋转速度
    }
  })

  return <primitive ref={modelRef} object={scene} />
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      {/* 环境光和方向光 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* 模型加载和垂直旋转 */}
      <RotatingModel url="/path/to/model.glb" />
      {/* 轨道控制 */}
      <OrbitControls enableZoom={true} />
    </Canvas>
  )
}

export default App
