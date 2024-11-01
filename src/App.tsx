import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LoginForm } from '@/components/auth/LoginForm';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardContent />} />
          {/* Add other dashboard routes here */}
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;