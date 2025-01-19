import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dashboard } from "@/lib/types/dashboard-types";
import { Spinner } from "../ui/spinner";

type DashboardCardProps = {
  card: Dashboard;
  isLoading: boolean;
};

export default function DashboardCard({ card, isLoading }: DashboardCardProps) {
  return (
    <Card>
      {isLoading ? (
        <div className="flex h-28 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </>
      )}
    </Card>
  );
}
