import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SidebarProvider } from './hooks/useSidebar'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './routes/Dashboard'
import Sales from './routes/Sales'
import Reports from './routes/Reports'
import Settings from './routes/Settings'

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sales" element={<Sales />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App