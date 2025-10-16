import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import type { Resource } from "@/types";

const resources: Resource[] = [
  {
    name: "Vandrevala Foundation Mental Health Helpline",
    description:
      "A 24/7 helpline providing free psychological counseling and crisis intervention for anyone feeling distressed, depressed, or suicidal.",
    phone: "9999666555",
    website: "https://www.vandrevalafoundation.com/",
  },
  {
    name: "iCALL Psychosocial Helpline",
    description:
      "A service by the Tata Institute of Social Sciences (TISS) offering free telephone and email-based counseling services, run by trained mental health professionals.",
    phone: "022-25521111",
    website: "https://icallhelpline.org/",
  },
  {
    name: "KIRAN Mental Health Rehabilitation Helpline",
    description:
      "A 24/7 helpline by the Ministry of Social Justice and Empowerment for early screening, first-aid, psychological support, and mental well-being services.",
    phone: "1800-599-0019",
    website: "https://www.socialjustice.gov.in/",
  },
  {
    name: "AASRA",
    description:
      "A 24/7 helpline for those who are distressed, depressed, or suicidal. They provide confidential and non-judgmental emotional support.",
    phone: "9820466726",
    website: "http://www.aasra.info/",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground">
          Mental Health Resources
        </h1>
        <p className="text-lg text-muted-foreground">
          Help is always available. You are not alone.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.name}>
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                {resource.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{resource.description}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{resource.phone}</span>
              </div>
              <Button asChild variant="outline">
                <a
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
