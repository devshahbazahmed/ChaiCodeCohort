import type {ReactNode} from "react";
import {createContext, useContext, useState} from "react";

import {Link, createFileRoute} from "@tanstack/react-router";

import {Button} from "@/components/ui/button";

export const Route = createFileRoute("/state")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto p-8">
      <h1 className="text-3xl font-bold md:text-4xl">React Context</h1>
      <p className="mt-2 text-sm text-gray-500">
        Learn how to share data across components and manage global state more
        effectively.
      </p>

      <Button variant="link" className="mt-8 mb-6 pl-0 text-lg" size="lg">
        <Link to="/" className="underline-offset-3!">
          Back to Home
        </Link>
      </Button>

      <PropDrillingSection />
      <ContextSection />

      <Button variant="link" className="mt-8 pl-0 text-lg" size="lg">
        <Link to="/" className="underline-offset-3!">
          Back to Home
        </Link>
      </Button>
    </div>
  );
}

const SWATCHES = ["#EBDEFB", "#DBE9FE", "#DCFCE7", "#FEE2E2", "#FEF3C7"];

function Swatch({
  value,
  onChange,
}: {
  value: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="flex gap-2">
      {SWATCHES.map(c => (
        <button
          key={c}
          onClick={() => onChange(c)}
          style={{backgroundColor: c}}
          className={`h-6 w-6 rounded-full border-2 transition-transform ${
            value === c
              ? "scale-110 border-gray-500"
              : "border-transparent hover:scale-105"
          }`}
        />
      ))}
    </div>
  );
}

function TreeBox({
  label,
  sublabel,
  children,
  dim,
}: {
  label: string;
  sublabel?: string;
  children?: ReactNode;
  dim?: boolean;
}) {
  return (
    <div
      className={`space-y-2 rounded-xl border p-3 ${dim ? "border-gray-100 bg-gray-50" : "border-gray-200 bg-white"}`}
    >
      <div>
        <span className="font-mono text-xs font-medium">&lt;{label}&gt;</span>
        {sublabel && (
          <span className="ml-2 font-mono text-xs text-gray-400">
            // {sublabel}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function PropTag({value}: {value: string}) {
  return (
    <span className="inline-block rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-mono text-xs text-amber-700">
      color=&quot;{value}&quot;
    </span>
  );
}

function PropDrillingSection() {
  const [color, setColor] = useState(SWATCHES[0]);

  return (
    <section className="mb-20">
      <h2 className="mb-1 text-xl font-medium">The problem: prop drilling</h2>
      <p className="mb-6 text-sm text-gray-500">
        Without context, data must thread through every component in between -
        even ones that don&apos;t use it.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Live demo</p>
            <Swatch value={color} onChange={setColor} />
          </div>

          <TreeBox label="App" sublabel="owns the colour">
            <PropTag value={color} />
            <TreeBox
              label="Section"
              sublabel="doesn't use it, just passes it down"
            >
              <PropTag value={color} />
              <TreeBox label="Button" sublabel="finally uses it">
                <div
                  style={{backgroundColor: color}}
                  className="rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors"
                >
                  My favourite color!
                </div>
              </TreeBox>
            </TreeBox>
          </TreeBox>

          <p className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-700">
            <strong>Section</strong> must accept and forward <code>color</code>{" "}
            even though it never uses it. Add more levels and this becomes
            painful fast.
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium">Code</p>
          <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
            {`function App() {
  const [color, setColor] =
    useState('#EBDEFB')

  return <Section color={color} />
}

function Section({ color }) {
  return <Button color={color} />
}

function Button({ color }) {
  return (
    <div style={{ background: color }}>
      My favourite color!
    </div>
  )
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// SECTION 2 — CONTEXT
// ════════════════════════════════════════════════════════════

// Step 2 — provide
const FavouriteColorContext = createContext<string>(SWATCHES[0]);

function ProviderDemo() {
  const [color, setColor] = useState(SWATCHES[0]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">Broadcasting:</span>
        <Swatch value={color} onChange={setColor} />
      </div>

      <FavouriteColorContext.Provider value={color}>
        <div className="rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-3">
          <p className="mb-2 font-mono text-xs font-medium text-blue-500">
            &lt;FavouriteColorContext.Provider value=&quot;{color}&quot;&gt;
          </p>
          <ProviderDemoChild />
          <p className="mt-2 font-mono text-xs text-blue-400">
            &lt;/FavouriteColorContext.Provider&gt;
          </p>
        </div>
      </FavouriteColorContext.Provider>
    </div>
  );
}

function ProviderDemoChild() {
  const color = useContext(FavouriteColorContext);
  return (
    <div className="ml-4 space-y-2 rounded-lg border border-gray-200 bg-white p-3">
      <p className="font-mono text-xs text-gray-400">&lt;DeepChild&gt;</p>
      <div
        style={{backgroundColor: color}}
        className="rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors"
      >
        My favourite color!
      </div>
      <p className="text-center text-xs text-gray-400">no props passed ✓</p>
    </div>
  );
}

// Step 4 — update
type MutableColor = {color: string; setColor: (c: string) => void};
const MutableColorContext = createContext<MutableColor>({
  color: SWATCHES[0],
  setColor: () => {},
});

function UpdatingDemo() {
  const [color, setColor] = useState(SWATCHES[0]);

  return (
    <MutableColorContext.Provider value={{color, setColor}}>
      <div className="space-y-2 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-3">
        <p className="font-mono text-xs font-medium text-blue-500">
          &lt;ColorContext.Provider value=&#123;&#123; color, setColor
          &#125;&#125;&gt;
        </p>
        <div className="ml-4 space-y-2 rounded-xl border border-gray-100 bg-white p-3">
          <p className="font-mono text-xs text-gray-400">
            &lt;Layout&gt; — no color prop needed
          </p>
          <UpdatingDemoChild />
        </div>
        <p className="mt-2 font-mono text-xs font-medium text-blue-500">
          &lt;/ColorContext.Provider&gt;
        </p>
      </div>
    </MutableColorContext.Provider>
  );
}

function UpdatingDemoChild() {
  const {color, setColor} = useContext(MutableColorContext);
  return (
    <div className="ml-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="font-mono text-xs text-gray-400">
        &lt;DeepChild&gt; — reads AND writes
      </p>
      <div
        style={{backgroundColor: color}}
        className="rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors"
      >
        My favourite color!
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">Change it:</span>
        <Swatch value={color} onChange={setColor} />
      </div>
    </div>
  );
}

function StepCard({
  step,
  title,
  desc,
  demo,
  code,
}: {
  step: number;
  title: string;
  desc: string;
  demo?: ReactNode;
  code: string;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
          {step}
        </span>
        <p className="text-sm font-medium">{title}</p>
      </div>
      <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
      {demo}
      <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function ContextSection() {
  return (
    <section>
      <h2 className="mb-1 text-xl font-medium">The solution: React Context</h2>
      <p className="mb-6 text-sm text-gray-500">
        Context lets you beam data directly to any descendant - no intermediate
        props required. There are two steps: providing and consuming.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StepCard
          step={1}
          title="Create the context"
          desc="Call createContext() once — at the top of a file or in its own module. The argument is the fallback value used when no Provider exists above in the tree."
          code={`import { createContext } from 'react'

// The argument is the default value,
// used when there is no Provider above.
export const FavouriteColorContext = createContext<string>('#EBDEFB')`}
        />

        <StepCard
          step={2}
          title="Provide - broadcast the value"
          desc="Wrap the subtree that needs the data in a Provider. Whatever you pass as value is broadcast to all descendants. Change the colour below to see it update live."
          demo={<ProviderDemo />}
          code={`function App() {
  const [color, setColor] =
    useState('#EBDEFB')

  return (
    <FavouriteColorContext.Provider
      value={color}
    >
      <Home /> {/* any depth */}
    </FavouriteColorContext.Provider>
  )
}`}
        />

        <StepCard
          step={3}
          title="Consume - read with useContext"
          desc="Any descendant can read the context value without receiving any props. useContext subscribes the component it re-renders automatically when the value changes."
          code={`import { useContext } from 'react'
import { FavouriteColorContext } from './App'

function DeepChild() {
  const color = useContext(FavouriteColorContext)

  return (
    <div style={{ background: color }}>
      My favourite color!
    </div>
  )
}`}
        />

        <StepCard
          step={4}
          title="Update - pass the setter too"
          desc="Pass both the value and its setter as the context value. Any descendant can then read and update the shared state. The deep child below does both - try the swatches."
          demo={<UpdatingDemo />}
          code={`type ColorCtx = {
  color: string
  setColor: (c: string) => void
}
const ColorContext = createContext<ColorCtx>(...)

// Provide both together
<ColorContext.Provider
  value={{ color, setColor }}
>
  <App />
</ColorContext.Provider>

// Deep child reads AND writes
function DeepChild() {
  const { color, setColor } =
    useContext(ColorContext)
}`}
        />
      </div>
    </section>
  );
}
