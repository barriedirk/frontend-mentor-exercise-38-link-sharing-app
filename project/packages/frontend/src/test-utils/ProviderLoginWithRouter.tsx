import Login from '@src/features/auth/pages/Login';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

function MockHome() {
  return <div>Home Page</div>;
}

function MockDefault() {
  return <div>Default Page</div>;
}

export function ProviderLoginWithRouter() {
  return (
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MockHome />} />
        <Route path="*" element={<MockDefault />} />
      </Routes>
    </MemoryRouter>
  );
}
