import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

interface TabContentProps {
  value: string;
  title: string;
  description: string;
  child: React.ReactNode;
  icon: React.ReactNode;
}

export function TabContent({
  value,
  title,
  description,
  child,
  icon,
}: TabContentProps) {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-3">
            {title}
            {icon}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">{child}</CardContent>
      </Card>
    </TabsContent>
  );
}
