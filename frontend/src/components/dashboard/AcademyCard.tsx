import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAcademy } from "@/hooks/queries/useAcademy";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { Spinner } from "../ui/spinner";

export default function AcademyCard() {
  const { data: academy, isLoading } = useAcademy();

  if (!academy) return null;

  return (
    <Card>
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-md flex items-center gap-2 font-bold sm:text-xl">
              <Building2 />
              Academy Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-semibold">{academy.name}</p>

              <div className="space-y-1 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{academy.email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{academy.phone_number}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{academy.address}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
