import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorState } from './ErrorState';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 flex items-center justify-center">
          <ErrorState
            title={this.props.fallbackTitle || 'A component encountered an issue'}
            message={this.state.error?.message || 'An unexpected rendering error occurred.'}
            onRetry={() => this.setState({ hasError: false, error: undefined })}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
