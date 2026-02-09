/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface SidebarContextType {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev: any) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isCollapsed,
        toggleSidebar,
        toggleCollapse,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
