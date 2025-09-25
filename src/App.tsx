import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Compulsory from './pages/Compulsory';
import Optional from './pages/Optional';
import Quiz from './pages/Quiz';
import Sessions from './pages/Sessions';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
            <Navigation />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/compulsory" element={<Compulsory />} />
                <Route path="/optional" element={<Optional />} />
                <Route path="/quiz/:subjectSlug" element={<Quiz />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
