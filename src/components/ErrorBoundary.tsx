import React, { Component, ErrorInfo } from 'react';
import { XCircle } from 'lucide-react';
import { debug } from '../lib/debug';
import { t } from '../lib/i18n';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    debug.log('error', 'React error boundary caught an error', {
      error,
      componentStack: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 max-w-md w-full text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 animate-ping">
                <XCircle className="h-16 w-16 mx-auto text-red-400/50" />
              </div>
              <XCircle className="h-16 w-16 mx-auto text-red-500 relative" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('error_occurred')}</h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || t('unexpected_error')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
            >
              {t('reload_page')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}