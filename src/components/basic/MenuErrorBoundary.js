import React from 'react'
import { View } from 'react-native'

class MenuErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    console.error('MenuErrorBoundary caught error:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details for debugging
    console.error('Menu Error Details:', {
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
      stack: error.stack
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI - just render the children without the problematic menu
      return (
        <View style={{ flex: 1 }}>
          {this.props.children}
        </View>
      );
    }

    return this.props.children;
  }
}

export default MenuErrorBoundary
