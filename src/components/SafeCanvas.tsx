import { Suspense, ComponentPropsWithoutRef, useState, useEffect, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import WebGLErrorBoundary from './WebGLErrorBoundary';

type SafeCanvasProps = ComponentPropsWithoutRef<typeof Canvas> & { fallbackUI?: ReactNode };

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

export function SafeCanvas({ children, fallbackUI, ...props }: SafeCanvasProps) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  const defaultFallback = (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent'
      }}
    />
  );

  const finalFallback = fallbackUI || defaultFallback;

  if (!hasWebGL) {
    return <>{finalFallback}</>;
  }

  return (
    <WebGLErrorBoundary fallback={finalFallback}>
      <Canvas fallback={finalFallback} {...props}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
