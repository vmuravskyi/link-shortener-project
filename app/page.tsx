import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, BarChart3, Shield, Zap, Globe, MousePointerClick } from "lucide-react";

const features = [
  {
    icon: Link,
    title: "Shorten Any URL",
    description:
      "Transform long, unwieldy URLs into clean, memorable short links in seconds.",
  },
  {
    icon: BarChart3,
    title: "Click Analytics",
    description:
      "Track every click with detailed analytics — see when and where your links are visited.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "All links are protected with enterprise-grade security. Your data stays safe.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Redirects happen in milliseconds. Your audience never waits.",
  },
  {
    icon: Globe,
    title: "Custom Slugs",
    description:
      "Choose your own short slug to create branded, recognizable links.",
  },
  {
    icon: MousePointerClick,
    title: "Easy to Use",
    description:
      "A simple dashboard to create, manage, and organize all your links in one place.",
  },
];

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center gap-8 px-6 pt-24 pb-16 text-center">
        <Badge variant="secondary" className="text-sm">
          Free &amp; Open Source
        </Badge>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Short links, big&nbsp;results
        </h1>

        <p className="max-w-lg text-lg text-muted-foreground">
          Create short, branded links in seconds. Track clicks and gain
          insights — all from a simple, beautiful dashboard.
        </p>

        <div className="flex gap-3">
          <SignUpButton mode="modal">
            <Button size="lg">Get Started — It&apos;s Free</Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Everything you need to manage your links
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-6 px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to shorten your first link?
        </h2>
        <SignUpButton mode="modal">
          <Button size="lg">Create Your Free Account</Button>
        </SignUpButton>
      </section>
    </div>
  );
}
