import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Materials } from './Materials';
import { Practice } from './Practice';
import { Sidebar } from './Sidebar';
import { TopicsPage } from './topics/TopicsPage';
export function App() {
  const location = useLocation();
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[230px_minmax(0,1fr)]">
      <Sidebar />
      <main className="mx-auto w-full min-w-0 max-w-5xl px-4 py-8 sm:px-8 md:py-12 lg:px-12">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={{ pathname: '/topics', hash: location.hash }} replace />}
          />
          <Route path="/practice" element={<Practice />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="*" element={<Navigate to="/topics" replace />} />
        </Routes>
      </main>
    </div>
  );
}
