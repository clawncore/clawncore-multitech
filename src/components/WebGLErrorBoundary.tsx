import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches WebGL context creation errors from React Three Fiber Canvas components.
 * Without this, a failed Canvas will cause React to re-render infinitely,
 * spawning unlimited WebGL contexts and crashing the browser tab.
 */
class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Only suppress known WebGL context errors
    if (
      error.message?.includes('WebGL context') ||
      error.message?.includes('WebGL') ||
      error.message?.includes('THREE')
    ) {
      // Silently swallow — environment doesn't support WebGL
      return;
    }
    // Re-throw other errors
    throw error;
  }

  render() {
    if (this.state.hasError) {
      // Render a CSS-only fallback so the page still looks good without 3D
      return (
        this.props.fallback ?? (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f0f4ff 100%)',
              backgroundSize: '400% 400%',
              animation: 'gradientShift 8s ease infinite',
            }}
          />
        )
      );
    }
    return this.props.children;
  }
}

export default WebGLErrorBoundary;
