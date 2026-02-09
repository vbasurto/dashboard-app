import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Sales() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
        <p className="text-muted-foreground">
          Gestiona todas tus ventas y transacciones
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Ventas</CardTitle>
          <CardDescription>
            Historial completo de ventas realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-12">
            Aquí irá la tabla de ventas con filtros y paginación
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
