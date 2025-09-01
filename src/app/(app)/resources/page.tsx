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
    name: "National Suicide Prevention Lifeline",
    description:
      "Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
    phone: "988",
    website: "https://988lifeline.org/",
  },
  {
    name: "Crisis Text Line",
    description:
      "Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis. A live, trained Crisis Counselor receives the text and responds, all from our secure online platform.",
    phone: "Text HOME to 741741",
    website: "https://www.crisistextline.org/",
  },
  {
    name: "The Trevor Project",
    description:
      "The leading national organization providing crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender, queer & questioning (LGBTQ) young people under 25.",
    phone: "1-866-488-7386",
    website: "https://www.thetrevorproject.org/",
  },
  {
    name: "NAMI (National Alliance on Mental Illness)",
    description:
      "The nation’s largest grassroots mental health organization dedicated to building better lives for the millions of Americans affected by mental illness.",
    phone: "1-800-950-NAMI (6264)",
    website: "https://www.nami.org/",
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
