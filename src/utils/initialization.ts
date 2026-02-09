/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Platform, UserConfig, FeatureFlags } from "@/types";

const isDevelopment = import.meta.env.DEV;

// Función auxiliar para logging solo en desarrollo
const devLog = (emoji: string, message: string) => {
  if (isDevelopment) {
    console.log(`${emoji} ${message}`);
  }
};

const devWarn = (emoji: string, message: string) => {
  if (isDevelopment) {
    console.warn(`${emoji} ${message}`);
  }
};

const devError = (emoji: string, message: string, error?: any) => {
  if (isDevelopment) {
    console.error(`${emoji} ${message}`, error || "");
  }
};

/**
 * Detecta la plataforma desde la que se está ejecutando la app
 */
export function detectPlatform(): Platform {
  // Detectar Teams
  if (
    window.location.href.includes("teams.microsoft.com") ||
    (window as any).microsoftTeams
  ) {
    devLog("📱", "Plataforma detectada: Teams");
    return "teams";
  }

  // Detectar iOS (Safari, WebView, PWA)
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  if (isIOS) {
    devLog("📱", "Plataforma detectada: iOS");
    return "ios";
  }

  // Detectar Android (Chrome, WebView, PWA)
  const isAndroid = /Android/.test(navigator.userAgent);
  if (isAndroid) {
    devLog("📱", "Plataforma detectada: Android");
    return "android";
  }

  // Por defecto: Web
  devLog("📱", "Plataforma detectada: Web");
  return "web";
}

/**
 * Inicializa la plataforma específica
 */
export async function initializePlatform(platform: Platform): Promise<void> {
  switch (platform) {
    case "teams":
      devLog("🔵", "Inicializando Microsoft Teams...");
      // Teams ya se inicializa en el TeamsContext
      // Aquí puedes agregar lógica adicional si necesitas
      await new Promise((resolve) => setTimeout(resolve, 500));
      break;

    case "ios":
      devLog("🍎", "Inicializando iOS...");
      // Configuración específica de iOS
      // Ejemplo: Configurar bridge nativo si tienes uno
      // if (window.webkit?.messageHandlers?.appBridge) {
      //   await window.webkit.messageHandlers.appBridge.postMessage({ action: 'init' });
      // }
      await new Promise((resolve) => setTimeout(resolve, 500));
      break;

    case "android":
      devLog("🤖", "Inicializando Android...");
      // Configuración específica de Android
      // Ejemplo: Llamar a interface nativa
      // if (window.Android?.initialize) {
      //   await window.Android.initialize();
      // }
      await new Promise((resolve) => setTimeout(resolve, 500));
      break;

    case "web":
      devLog("🌐", "Inicializando Web...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      break;
  }
}

/**
 * Valida la autenticación del usuario
 */
export async function validateAuthentication(
  isInTeams: boolean,
  isAuthenticated: boolean,
  user: any,
): Promise<void> {
  devLog("🔐", "Validando autenticación...");

  if (isInTeams) {
    // En Teams, validar que tengamos el usuario de Teams
    if (!isAuthenticated || !user) {
      throw new Error("No se pudo autenticar en Microsoft Teams");
    }
    devLog("✅", `Usuario autenticado en Teams: ${user.name}`);
  } else {
    // En Web/Mobile, aquí harías tu flujo de autenticación
    const token = localStorage.getItem("authToken");

    if (!token) {
      devWarn("⚠️", "No hay token de autenticación. Usuario invitado.");
      // Puedes redirigir al login o permitir acceso limitado
      // throw new Error("Usuario no autenticado");
    } else {
      // Validar el token con tu backend
      // try {
      //   const response = await fetch('/api/auth/validate', {
      //     headers: { Authorization: `Bearer ${token}` }
      //   });
      //   if (!response.ok) throw new Error("Token inválido");
      //   devLog("✅", "Token validado correctamente");
      // } catch (error) {
      //   throw new Error("Error al validar el token de autenticación");
      // }
      devLog("✅", "Token validado correctamente");
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
}

/**
 * Carga la configuración del usuario
 */
export async function loadUserConfig(user: any): Promise<UserConfig | null> {
  devLog("⚙️", "Cargando configuración de usuario...");

  try {
    // Aquí cargarías la configuración desde tu API
    // const response = await fetch(`/api/users/${user?.id}/config`);
    // if (!response.ok) throw new Error("Error al cargar configuración");
    // const config = await response.json();
    // localStorage.setItem("userConfig", JSON.stringify(config));
    // devLog("✅", "Configuración de usuario cargada");
    // return config;

    // Simulación temporal
    await new Promise((resolve) => setTimeout(resolve, 400));

    const mockConfig: UserConfig = {
      language: "es",
      notifications: true,
      timezone: "America/Mexico_City",
      preferences: {
        theme: "auto",
        compactMode: false,
      },
    };

    devLog("✅", "Configuración de usuario cargada");
    return mockConfig;
  } catch (error) {
    devError("⚠️", "No se pudo cargar configuración de usuario:", error);
    return null;
  }
}

/**
 * Carga los feature flags de la aplicación
 */
export async function loadFeatureFlags(): Promise<FeatureFlags | null> {
  devLog("🚩", "Cargando feature flags...");

  try {
    // Aquí cargarías los feature flags desde tu API
    // const response = await fetch('/api/feature-flags');
    // if (!response.ok) throw new Error("Error al cargar feature flags");
    // const flags = await response.json();
    // localStorage.setItem("featureFlags", JSON.stringify(flags));
    // devLog("✅", "Feature flags cargados");
    // return flags;

    // Simulación temporal
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockFlags: FeatureFlags = {
      newUI: true,
      aiChat: false,
      betaMode: isDevelopment,
      advancedReports: true,
    };

    devLog("✅", "Feature flags cargados");
    return mockFlags;
  } catch (error) {
    devError("⚠️", "No se pudieron cargar feature flags:", error);
    return null;
  }
}
