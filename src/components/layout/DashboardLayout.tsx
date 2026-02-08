import { Outlet } from "react-router-dom";
import Sidebar from "@/components/nav/Sidebar";
import Header from "@/components/layout/Header";
import FloatingAIButton from "@/components/ai-chat/FloatingAIButton";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <FloatingAIButton />
    </div>
  );
}
