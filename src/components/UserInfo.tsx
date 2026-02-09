import { useApp } from "@/contexts/AppContext";

export function UserInfo() {
  const { isInTeams, user, theme, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <h2 className="text-xl font-bold mb-2">Información del Usuario</h2>
      <p>{JSON.stringify(user, null, 2)}</p>
      <p>Email: {user?.email || "N/A"}</p>
      <p>ID: {user?.id || "N/A"}</p>
      {isInTeams && (
        <span className="text-sm text-blue-500">✓ En Microsoft Teams</span>
      )}
      <p>Tema: {theme}</p>
    </div>
  );
}
