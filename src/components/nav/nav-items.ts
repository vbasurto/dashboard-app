import {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Settings,
  Users,
  Package,
  FileText,
  Folder,
} from "lucide-react";
import { type NavItem } from "@/types/nav";

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Ventas",
    icon: ShoppingCart,
    children: [
      {
        label: "Todas las Ventas",
        href: "/sales",
        icon: ShoppingCart,
      },
      {
        label: "Productos",
        href: "/sales/products",
        icon: Package,
      },
      {
        label: "Clientes",
        href: "/sales/customers",
        icon: Users,
      },
    ],
  },
  {
    label: "Reportes",
    icon: BarChart3,
    children: [
      {
        label: "Análisis",
        href: "/reports",
        icon: BarChart3,
      },
      {
        label: "Documentos",
        href: "/reports/documents",
        icon: FileText,
      },
      {
        label: "Archivos",
        href: "/reports/files",
        icon: Folder,
      },
    ],
  },
  {
    label: "Configuración",
    href: "/settings",
    icon: Settings,
  },
];
