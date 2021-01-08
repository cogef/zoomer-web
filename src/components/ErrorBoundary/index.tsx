import React from 'react';

export class ErrorBoundary extends React.Component {
  componentDidCatch(error: any, errorInfo: any) {
    console.log({ error, errorInfo });
  }

  render() {
    return this.props.children;
  }
}
