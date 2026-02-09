import { useApp } from "@/contexts/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Copy,
  Check,
  Monitor,
  User,
  Palette,
  Settings,
  Flag,
  Info,
} from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Información del Sistema
          </h2>
          <p className="text-muted-foreground">
            Detalles del contexto de la aplicación
          </p>
        </div>
        <Button onClick={copyToClipboard} variant="outline">
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copiar Todo
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Plataforma */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Plataforma
            </CardTitle>
            <CardDescription>Información del dispositivo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tipo</span>
              <Badge variant="secondary">{platform.toUpperCase()}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">En Teams</span>
              <Badge variant={isInTeams ? "default" : "outline"}>
                {isInTeams ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Web</span>
              <Badge variant={isWeb ? "default" : "outline"}>
                {isWeb ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">iOS</span>
              <Badge variant={isIOS ? "default" : "outline"}>
                {isIOS ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Android</span>
              <Badge variant={isAndroid ? "default" : "outline"}>
                {isAndroid ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Móvil</span>
              <Badge variant={isMobile ? "default" : "outline"}>
                {isMobile ? "Sí" : "No"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Usuario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Usuario
            </CardTitle>
            <CardDescription>Información de sesión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isAuthenticated && user ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Estado</span>
                  <Badge>Autenticado</Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">ID</p>
                    <p className="text-sm font-medium">{user.id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Nombre</p>
                    <p className="text-sm font-medium">{user.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{user.email || "N/A"}</p>
                  </div>
                  {user.role && (
                    <div>
                      <p className="text-xs text-muted-foreground">Rol</p>
                      <p className="text-sm font-medium">{user.role}</p>
                    </div>
                  )}
                </div>
                <Separator />
                <Button
                  onClick={logout}
                  variant="destructive"
                  className="w-full"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estado</span>
                <Badge variant="outline">No autenticado</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Tema
            </CardTitle>
            <CardDescription>Preferencia de visualización</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Actual</span>
              <Badge variant="secondary">{theme.toUpperCase()}</Badge>
            </div>
            <Separator />
            <div className="space-y-2">
              <Button
                onClick={() => setTheme("light")}
                variant={theme === "light" ? "default" : "outline"}
                className="w-full"
              >
                ☀️ Claro
              </Button>
              <Button
                onClick={() => setTheme("dark")}
                variant={theme === "dark" ? "default" : "outline"}
                className="w-full"
              >
                🌙 Oscuro
              </Button>
              <Button
                onClick={() => setTheme("default")}
                variant={theme === "default" ? "default" : "outline"}
                className="w-full"
              >
                🔄 Sistema
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración
            </CardTitle>
            <CardDescription>Preferencias del usuario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {userConfig ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Idioma</span>
                  <Badge variant="outline">
                    {userConfig.language || "No definido"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Notificaciones
                  </span>
                  <Badge
                    variant={userConfig.notifications ? "default" : "outline"}
                  >
                    {userConfig.notifications ? "Activadas" : "Desactivadas"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Zona Horaria
                  </span>
                  <Badge variant="outline">
                    {userConfig.timezone || "No definida"}
                  </Badge>
                </div>
                {userConfig.preferences && (
                  <>
                    <Separator />
                    <div className="p-2 bg-muted rounded text-xs">
                      <code className="text-sm">
                        {JSON.stringify(userConfig.preferences, null, 2)}
                      </code>
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Sin configuración guardada
              </p>
            )}
          </CardContent>
        </Card>

        {/* Feature Flags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Feature Flags
            </CardTitle>
            <CardDescription>Características habilitadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.keys(featureFlags).length > 0 ? (
              Object.entries(featureFlags).map(([key, enabled]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{key}</span>
                  <Badge variant={enabled ? "default" : "outline"}>
                    {enabled ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No hay feature flags cargados
              </p>
            )}
          </CardContent>
        </Card>

        {/* Estado del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Estado del Sistema
            </CardTitle>
            <CardDescription>Información técnica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Inicializado
              </span>
              <Badge variant={isInitialized ? "default" : "outline"}>
                {isInitialized ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Online</span>
              <Badge variant={navigator.onLine ? "default" : "outline"}>
                {navigator.onLine ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Idioma</span>
              <Badge variant="outline">{navigator.language}</Badge>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-1">User Agent</p>
              <p className="text-xs break-all">{navigator.userAgent}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">URL</p>
              <p className="text-xs break-all">{window.location.href}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
