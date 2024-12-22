@@ .. @@
 import { ErrorBoundary } from './components/ErrorBoundary';
+import { useNotifications } from './hooks/useNotifications';
 import { debug } from './lib/debug';
 
 // Enable debug logging in development
 if (import.meta.env.DEV) {
   debug.enable();
 }
 
 function App() {
+  // Initialize notifications
+  useNotifications();
+
   return (
     <ErrorBoundary>
       <BrowserRouter>