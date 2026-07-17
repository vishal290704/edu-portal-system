import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function FormSection({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icon className="h-5 w-5" />
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold">{title}</h3>

            {description && (
              <p className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}