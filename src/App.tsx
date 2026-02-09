/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "./hooks/useSidebar";
import { AppProvider, useApp } from "@/contexts/AppContext";
import GlobalLoader from "./components/GlobalLoader";
import {
  detectPlatform,
  initializePlatform,
  validateAuthentication,
  loadUserConfig,
  loadFeatureFlags,
} from "@/utils/initialization";

const DashboardLayout = lazy(
  () => import("./components/layout/DashboardLayout"),
);
const Dashboard = lazy(() => import("./routes/Dashboard"));
const Sales = lazy(() => import("./routes/Sales"));
const Reports = lazy(() => import("./routes/Reports"));
const Settings = lazy(() => import("./routes/Settings"));
const SystemInfo = lazy(() => import("./routes/SystemInfo"));

function App() {
  console.log("App render");
  return (
    <BrowserRouter>
      <AppProvider>
        <AppInitializer />
      </AppProvider>
    </BrowserRouter>
  );
}

function AppInitializer() {
  console.log("AppInitializer render");

  const { isInTeams, isAuthenticated, user, setUserConfig, setFeatureFlags } =
    useApp();

  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    console.log("useEffect init");

    if (hasInitialized.current) {
      console.log("already initialized");
      return;
    }

    const iniciarApp = async () => {
      try {
        console.log("initializing app...");
        hasInitialized.current = true;

        console.log("step 1 detect platform");
        const platform = detectPlatform();
        console.log("platform:", platform);

        console.log("step 2 initialize platform");
        await initializePlatform(platform);

        console.log("step 3 validate auth");
        await validateAuthentication(isInTeams, isAuthenticated, user);

        console.log("step 4 load user config");
        const config = await loadUserConfig(user);
        if (config) {
          console.log("setUserConfig:", config);
          setUserConfig(config);
        }

        console.log("step 5 load feature flags");
        const flags = await loadFeatureFlags();
        if (flags) {
          console.log("setFeatureFlags:", flags);
          setFeatureFlags(flags);
        }

        console.log("initialization success");
      } catch (error) {
        console.error("initialization error:", error);
        setInitError(
          error instanceof Error ? error.message : "Error desconocido",
        );
      } finally {
        console.log("initialization finished");
        setIsLoading(false);
      }
    };

    iniciarApp();
  }, []);

  if (isLoading) {
    console.log("show loader");
    return <GlobalLoader />;
  }

  if (initError) {
    console.log("show error screen:", initError);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900">
        <div className="text-center p-8 max-w-md">
          <div className="mb-4 text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-200 mb-4">
            Error de Inicialización
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{initError}</p>
          <button
            onClick={() => {
              console.log("retry click");
              window.location.reload();
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  console.log("app ready -> render routes");

  return (
    <SidebarProvider>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sales" element={<Sales />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports/files" element={<SystemInfo />} />
          </Route>
        </Routes>
      </Suspense>
    </SidebarProvider>
  );
}

export default App;
