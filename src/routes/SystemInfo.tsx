import { useApp } from "@/contexts/AppContext";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function SystemInfo() {
  const {
    // Plataforma
    platform,
    isInTeams,
    isWeb,
    isIOS,
    isAndroid,
    isMobile,

    // Usuario
    user,
    isAuthenticated,

    // Tema
    theme,
    setTheme,

    // Configuración
    userConfig,

    // Feature Flags
    featureFlags,
    isFeatureEnabled,

    // Estado
    isInitialized,

    // Métodos
    logout,
  } = useApp();

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const data = {
      platform,
      isInTeams,
      isWeb,
      isIOS,
      isAndroid,
      isMobile,
      user,
      isAuthenticated,
      theme,
      userConfig,
      featureFlags,
      isInitialized,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Información del Sistema
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Detalles completos del contexto de la aplicación
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copiar Todo
            </>
          )}
        </button>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. PLATAFORMA */}
        <Card title="📱 Plataforma">
          <InfoRow label="Tipo" value={platform.toUpperCase()} highlight />
          <InfoRow label="En Teams" value={isInTeams ? "✅ Sí" : "❌ No"} />
          <InfoRow label="Web" value={isWeb ? "✅ Sí" : "❌ No"} />
          <InfoRow label="iOS" value={isIOS ? "✅ Sí" : "❌ No"} />
          <InfoRow label="Android" value={isAndroid ? "✅ Sí" : "❌ No"} />
          <InfoRow label="Móvil" value={isMobile ? "✅ Sí" : "❌ No"} />
        </Card>

        {/* 2. USUARIO */}
        <Card title="👤 Usuario">
          {isAuthenticated && user ? (
            <>
              <InfoRow label="Estado" value="✅ Autenticado" highlight />
              <InfoRow label="ID" value={user.id || "N/A"} />
              <InfoRow label="Nombre" value={user.name || "N/A"} />
              <InfoRow label="Email" value={user.email || "N/A"} />
              {user.role && <InfoRow label="Rol" value={user.role} />}
              <button
                onClick={logout}
                className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <InfoRow label="Estado" value="❌ No autenticado" highlight />
          )}
        </Card>

        {/* 3. TEMA */}
        <Card title="🎨 Tema">
          <InfoRow label="Actual" value={theme.toUpperCase()} highlight />
          <div className="mt-4 space-y-2">
            <button
              onClick={() => setTheme("light")}
              className={`w-full px-4 py-2 rounded text-sm transition-colors ${
                theme === "light"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              ☀️ Claro
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`w-full px-4 py-2 rounded text-sm transition-colors ${
                theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              🌙 Oscuro
            </button>
            <button
              onClick={() => setTheme("default")}
              className={`w-full px-4 py-2 rounded text-sm transition-colors ${
                theme === "default"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              🔄 Sistema
            </button>
          </div>
        </Card>

        {/* 4. CONFIGURACIÓN */}
        <Card title="⚙️ Configuración">
          {userConfig ? (
            <>
              <InfoRow
                label="Idioma"
                value={userConfig.language || "No definido"}
              />
              <InfoRow
                label="Notificaciones"
                value={
                  userConfig.notifications ? "✅ Activadas" : "❌ Desactivadas"
                }
              />
              <InfoRow
                label="Zona Horaria"
                value={userConfig.timezone || "No definida"}
              />
              {userConfig.preferences && (
                <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                  <code className="text-gray-800 dark:text-gray-200">
                    {JSON.stringify(userConfig.preferences, null, 2)}
                  </code>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Sin configuración guardada
            </p>
          )}
        </Card>

        {/* 5. FEATURE FLAGS */}
        <Card title="🚩 Feature Flags">
          {Object.keys(featureFlags).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(featureFlags).map(([key, enabled]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <span className="text-sm font-medium">{key}</span>
                  <span className={enabled ? "text-green-600" : "text-red-600"}>
                    {enabled ? "✅" : "❌"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No hay feature flags cargados
            </p>
          )}
        </Card>

        {/* 6. ESTADO DEL SISTEMA */}
        <Card title="🔧 Estado del Sistema">
          <InfoRow
            label="Inicializado"
            value={isInitialized ? "✅ Sí" : "❌ No"}
            highlight
          />
          <InfoRow label="User Agent" value={navigator.userAgent} truncate />
          <InfoRow label="URL" value={window.location.href} truncate />
          <InfoRow label="Idioma del navegador" value={navigator.language} />
          <InfoRow
            label="Online"
            value={navigator.onLine ? "✅ Sí" : "❌ No"}
          />
        </Card>
      </div>

      {/* Sección de ejemplo de uso de Feature Flags */}
      <Card title="💡 Ejemplo de Feature Flags en acción">
        <div className="space-y-3">
          {isFeatureEnabled("newUI") && (
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded">
              <p className="text-purple-800 dark:text-purple-200 font-semibold">
                🎉 Nueva UI habilitada
              </p>
            </div>
          )}
          {isFeatureEnabled("aiChat") && (
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded">
              <p className="text-blue-800 dark:text-blue-200 font-semibold">
                🤖 Chat AI habilitado
              </p>
            </div>
          )}
          {isFeatureEnabled("betaMode") && (
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded">
              <p className="text-yellow-800 dark:text-yellow-200 font-semibold">
                🧪 Modo Beta activo
              </p>
            </div>
          )}
          {!isFeatureEnabled("newUI") &&
            !isFeatureEnabled("aiChat") &&
            !isFeatureEnabled("betaMode") && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No hay features activas para mostrar
              </p>
            )}
        </div>
      </Card>
    </div>
  );
}

// Componente Card reutilizable
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// Componente InfoRow reutilizable
function InfoRow({
  label,
  value,
  highlight = false,
  truncate = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  truncate?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
        {label}
      </span>
      <span
        className={`text-sm ${
          highlight
            ? "font-bold text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300"
        } ${truncate ? "truncate" : ""}`}
        title={truncate ? value : undefined}
      >
        {value}
      </span>
    </div>
  );
}
