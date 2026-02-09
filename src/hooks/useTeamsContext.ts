import { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

interface TeamsContext {
  isInTeams: boolean;
  theme?: string;
  user?: {
    id: string;
    displayName?: string;
    userPrincipalName?: string;
  };
  isInitialized: boolean;
}

export function useTeamsContext() {
  const [context, setContext] = useState<TeamsContext>({
    isInTeams: false,
    isInitialized: false,
  });

  useEffect(() => {
    const initializeTeams = async () => {
      try {
        // Intentar inicializar el SDK de Teams
        await microsoftTeams.app.initialize();

        // Si llegamos aquí, estamos en Teams
        const teamsContext = await microsoftTeams.app.getContext();

        setContext({
          isInTeams: true,
          theme: teamsContext.app.theme,
          user: {
            id: teamsContext.user?.id || "",
            displayName: teamsContext.user?.displayName,
            userPrincipalName: teamsContext.user?.userPrincipalName,
          },
          isInitialized: true,
        });

        // Notificar a Teams que la app está lista
        microsoftTeams.app.notifySuccess();

        // Escuchar cambios de tema
        microsoftTeams.app.registerOnThemeChangeHandler((theme: string) => {
          setContext((prev) => ({ ...prev, theme }));
        });
      } catch {
        // No estamos en Teams, modo web normal
        console.log("No está ejecutándose en Teams, modo web normal");
        setContext({
          isInTeams: false,
          isInitialized: true,
        });
      }
    };

    initializeTeams();
  }, []);

  return context;
}
