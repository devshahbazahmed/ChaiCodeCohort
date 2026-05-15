import {Link, createFileRoute} from "@tanstack/react-router";
import {
  Boxes,
  Database,
  Gauge,
  MousePointer,
  Rocket,
  Route as RouteIcon,
} from "lucide-react";

import {Card, CardContent} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Home,
});

const modules = [
  {
    title: "Deployment",
    description:
      "Ship React applications confidently using modern hosting and deployment workflows.",
    href: "https://t-14-gamma.vercel.app/",
    icon: Rocket,
    accent:
      "border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100",
    badge: "Production",
    external: true,
  },
  {
    title: "Scaling",
    description:
      "Learn how large applications scale across teams, systems, and infrastructure.",
    href: "https://link.excalidraw.com/readonly/2048B6UWNCZcG5R5Xbja?darkMode=true",
    icon: Boxes,
    accent:
      "border-indigo-200 bg-indigo-50 hover:border-indigo-300 hover:bg-indigo-100",
    badge: "System Design",
    external: true,
  },
  {
    title: "Interactivity",
    description:
      "Learn event handling, state updates, conditional rendering, and dynamic UI patterns.",
    to: "/interactivity",
    icon: MousePointer,
    accent:
      "border-emerald-200 bg-emerald-50 hover:border-emerald-300 hover:bg-emerald-100",
    badge: "UI Logic",
  },
  {
    title: "Managing State",
    description:
      "Explore local state, derived state, lifting state up, and predictable data flow.",
    to: "/state",
    icon: Database,
    accent:
      "border-amber-200 bg-amber-50 hover:border-amber-300 hover:bg-amber-100",
    badge: "State Management",
  },
  {
    title: "Performance",
    description:
      "Understand rendering, memoization, Suspense, and optimization bottlenecks.",
    to: "/performance",
    icon: Gauge,
    accent:
      "border-rose-200 bg-rose-50 hover:border-rose-300 hover:bg-rose-100",
    badge: "Advanced",
  },
  {
    title: "Routing",
    description:
      "Build multi-page React applications using modern file-based routing patterns.",
    href: "https://chaicode.com/reviews?tag=webdev",
    icon: RouteIcon,
    accent:
      "border-violet-200 bg-violet-50 hover:border-violet-300 hover:bg-violet-100",
    badge: "Architecture",
    external: true,
  },
];

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold md:text-4xl">React MasterClass</h1>
      <p className="mt-2 text-sm text-gray-500">
        A practical learning experience from Akash, aka Your Next Tech Partner (
        <a
          href="https://yntp.me"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          yntp.me
        </a>
        ), crafted for the ChaiCode Web Dev Cohort 2026.
      </p>

      {/* Bento Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {modules.map(module => {
          const Icon = module.icon;

          const content = (
            <Card
              className={`group h-full cursor-pointer border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${module.accent}`}
            >
              <CardContent className="flex h-full flex-col justify-between px-6">
                <div>
                  <div className="mb-4 flex items-end justify-between">
                    <div className="rounded-xl border border-white/70 bg-white/80 p-1.5 shadow-sm backdrop-blur">
                      <Icon className="size-4 text-gray-700" />
                    </div>

                    <span className="rounded-full border border-white/60 bg-white/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-gray-500 uppercase">
                      {module.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                    {module.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {module.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Open Module
                  </span>

                  <div className="rounded-full border border-white/70 bg-white/80 px-2 py-1 text-xs text-gray-500 transition-transform group-hover:translate-x-1">
                    →
                  </div>
                </div>
              </CardContent>
            </Card>
          );

          if (module.external) {
            return (
              <a
                key={module.title}
                href={module.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={module.title} to={module.to} className="block">
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
