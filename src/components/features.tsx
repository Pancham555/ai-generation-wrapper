import { Lightbulb, ListChecks, MessageCircleMore } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const Feature = () => {
  return (
    <section className="py-32 flex justify-center">
      <div className="max-w-6xl">
        <Tabs defaultValue="feature-1">
          <TabsList className="flex h-auto w-full flex-col gap-2 bg-background md:flex-row">
            <TabsTrigger
              value="feature-1"
              className="flex w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-md border p-4 text-left text-primary hover:border-primary/40 data-[state=active]:border-primary"
            >
              <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                  <MessageCircleMore className="size-4 text-primary" />
                </span>
                <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                  Get Started
                </p>
              </div>
              <p className="font-normal text-muted-foreground md:block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </TabsTrigger>
            <TabsTrigger
              value="feature-2"
              className="flex w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-md border p-4 text-left text-primary hover:border-primary/40 data-[state=active]:border-primary"
            >
              <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                  <Lightbulb className="size-4 text-primary" />
                </span>
                <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                  Get Ideas
                </p>
              </div>
              <p className="font-normal text-muted-foreground md:block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </TabsTrigger>
            <TabsTrigger
              value="feature-3"
              className="flex w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-md border p-4 text-left text-primary hover:border-primary/40 data-[state=active]:border-primary"
            >
              <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                  <ListChecks className="size-4 text-primary" />
                </span>
                <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                  Build
                </p>
              </div>
              <p className="font-normal text-muted-foreground md:block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feature-1">
            <Image
              width={8000}
              height={8000}
              src="/placeholder.svg"
              alt="placeholder image"
              className="aspect-video rounded-md object-cover"
            />
          </TabsContent>
          <TabsContent value="feature-2">
            <Image
              width={8000}
              height={8000}
              src="/placeholder.svg"
              alt="placeholder image"
              className="aspect-video rounded-md object-cover"
            />
          </TabsContent>
          <TabsContent value="feature-3">
            <Image
              width={8000}
              height={8000}
              src="/placeholder.svg"
              alt="placeholder image"
              className="aspect-video rounded-md object-cover"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Feature;
