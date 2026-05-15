import type {ReactNode} from "react";
import {Component, useState} from "react";

import {Link, createFileRoute} from "@tanstack/react-router";

import {Button} from "@/components/ui/button";

export const Route = createFileRoute("/interactivity")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto p-8">
      <h1 className="text-3xl font-bold md:text-4xl">Interactivity in React</h1>
      <p className="mt-2 text-sm text-gray-500">
        Explore how user interactions work in React using events.
      </p>

      <Button variant="link" className="mt-8 mb-6 pl-0 text-lg" size="lg">
        <Link to="/" className="underline-offset-3!">
          Back to Home
        </Link>
      </Button>

      <BindingSection />
      <EventFlowSection />

      <Button variant="link" className="mt-8 pl-0 text-lg" size="lg">
        <Link to="/" className="underline-offset-3!">
          Back to Home
        </Link>
      </Button>
    </div>
  );
}

function CounterDisplay({
  count,
  onInc,
  onDec,
}: {
  count: number;
  onInc: () => void;
  onDec?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      {onDec && (
        <button
          onClick={onDec}
          className="h-8 w-8 rounded-lg border border-gray-200 text-base hover:bg-gray-50"
        >
          −
        </button>
      )}
      <button
        onClick={onInc}
        className="h-8 w-8 rounded-lg border border-gray-200 text-base hover:bg-gray-50"
      >
        +
      </button>
      <span className="w-8 text-center text-2xl font-medium tabular-nums">
        {count}
      </span>
    </div>
  );
}

function BrokenDemo() {
  const [error, setError] = useState(false);
  return (
    <div className="py-2">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setError(true)}
          className="h-8 w-8 rounded-lg border border-red-200 text-base text-red-400 hover:bg-red-50"
        >
          +
        </button>
        <span className="w-8 text-center text-2xl font-medium text-gray-200">
          0
        </span>
      </div>
      {error && (
        <p className="mt-2 rounded-lg bg-red-50 p-2 font-mono text-xs leading-relaxed text-red-600">
          TypeError: Cannot read properties of undefined (reading 'setState')
        </p>
      )}
    </div>
  );
}

class CtorCounter extends Component<object, {count: number}> {
  constructor(props: object) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(s => ({count: s.count + 1}));
  }
  render() {
    return <CounterDisplay count={this.state.count} onInc={this.handleClick} />;
  }
}

class FieldCounter extends Component<object, {count: number}> {
  state = {count: 0};
  handleClick = () => {
    this.setState(s => ({count: s.count + 1}));
  };
  render() {
    return <CounterDisplay count={this.state.count} onInc={this.handleClick} />;
  }
}

function HookDemo() {
  const [count, setCount] = useState(0);
  return (
    <CounterDisplay
      count={count}
      onInc={() => setCount(c => c + 1)}
      onDec={() => setCount(c => c - 1)}
    />
  );
}

type Variant = "broken" | "ok" | "warn" | "best";

const VARIANT_STYLES: Record<Variant, {badge: string; card: string}> = {
  broken: {
    badge: "bg-red-50 text-red-700 border border-red-200",
    card: "border-gray-200",
  },
  ok: {
    badge: "bg-green-50 text-green-700 border border-green-200",
    card: "border-gray-200",
  },
  warn: {
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    card: "border-gray-200",
  },
  best: {
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    card: "border-blue-300 border-2",
  },
};

function DemoCard({
  variant,
  badge,
  title,
  desc,
  demo,
  code,
}: {
  variant: Variant;
  badge: string;
  title: string;
  desc: string;
  demo: ReactNode;
  code: string;
}) {
  const s = VARIANT_STYLES[variant];
  return (
    <div className={`space-y-3 rounded-xl border p-5 ${s.card}`}>
      <span
        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${s.badge}`}
      >
        {badge}
      </span>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{desc}</p>
      </div>
      {demo}
      <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function BindingSection() {
  return (
    <section className="mb-20">
      <h2 className="mb-1 text-xl font-medium">Binding event handlers</h2>
      <p className="mb-6 text-sm text-gray-500">
        Class component methods lose{" "}
        <code className="rounded bg-gray-100 px-1 text-xs">this</code> when
        passed as DOM callbacks. Here are all the approaches.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DemoCard
          variant="broken"
          badge="🤷broken"
          title="No binding"
          desc="this is undefined inside the handler when invoked by the DOM event system in strict mode."
          demo={<BrokenDemo />}
          code={`class Counter extends Component {
  handleClick() {
    // this = undefined ❌
    this.setState(...)
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        +
      </button>
    )
  }
}`}
        />

        <DemoCard
          variant="ok"
          badge="✓ constructor bind"
          title="Bind in constructor"
          desc="Bound once at mount. No extra function created per render. Explicit and classic."
          demo={<CtorCounter />}
          code={`constructor(props) {
  super(props)
  this.state = { count: 0 }
  this.handleClick =
    this.handleClick.bind(this) // ✓
}

handleClick() {
  this.setState(s =>
    ({ count: s.count + 1 })
  )
}`}
        />

        <DemoCard
          variant="ok"
          badge="✓ class field"
          title="Class field arrow"
          desc="Arrow functions capture this lexically. No constructor or explicit bind needed."
          demo={<FieldCounter />}
          code={`class Counter extends Component {
  state = { count: 0 }

  // Arrow captures this ✓
  handleClick = () => {
    this.setState(s =>
      ({ count: s.count + 1 })
    )
  }
}`}
        />

        <DemoCard
          variant="best"
          badge="★ recommended"
          title="Function component + hooks"
          desc="No this, no binding. Closures capture state directly. The modern default."
          demo={<HookDemo />}
          code={`function Counter() {
  const [count, setCount] =
    useState(0)

  const handleClick = () => {
    setCount(c => c + 1) // ✓
  }

  return (
    <button onClick={handleClick}>
      +
    </button>
  )
}`}
        />
      </div>
    </section>
  );
}

type Mode = "normal" | "stop" | "prevent" | "capture";

const MODE_META: Record<Mode, {label: string; hint: string}> = {
  normal: {
    label: "Normal bubbling",
    hint: "Click the button. The event fires at the target then bubbles up: Inner → Middle → Outer.",
  },
  stop: {
    label: "stopPropagation",
    hint: "The inner button calls stopPropagation(). Middle and Outer handlers never fire.",
  },
  prevent: {
    label: "preventDefault",
    hint: "Stops the browser's default action (navigation, form reload) without affecting propagation.",
  },
  capture: {
    label: "Capture phase",
    hint: "onClickCapture fires top-down before any bubble handlers: Outer↓ → Middle↓ → Inner↓ then Inner↑ → Middle↑ → Outer↑.",
  },
};

const MODE_CODE: Record<Mode, string> = {
  normal: `<div onClick={() => log('Outer')}>
  <div onClick={() => log('Middle')}>
    <button
      onClick={() => log('Inner')}
    >
      Click
    </button>
  </div>
</div>

// Fires: Inner → Middle → Outer`,

  stop: `<div onClick={() => log('Outer')}>
  <div onClick={() => log('Middle')}>
    <button
      onClick={(e) => {
        e.stopPropagation() // ⛔
        log('Inner — stopped')
      }}
    >
      Click
    </button>
  </div>
</div>

// Fires: Inner only (rest blocked)`,

  prevent: `// Stops browser default, NOT propagation

<a
  href="/somewhere"
  onClick={(e) => {
    e.preventDefault() // no navigation
    handleLogin()
  }}
>
  Login
</a>

<form
  onSubmit={(e) => {
    e.preventDefault() // no page reload
    handleSubmit(data)
  }}
/>`,

  capture: `// onClickCapture = capture phase ↓
// onClick         = bubble phase  ↑

<div
  onClickCapture={() => log('Outer ↓')}
  onClick={() => log('Outer ↑')}
>
  <div
    onClickCapture={() => log('Middle ↓')}
    onClick={() => log('Middle ↑')}
  >
    <button
      onClickCapture={() => log('Inner ↓')}
      onClick={() => log('Inner ↑')}
    />
  </div>
</div>
// Order: Outer↓ Middle↓ Inner↓ Inner↑ Middle↑ Outer↑`,
};

type LogEntry = {
  msg: string;
  kind: "bubble" | "capture" | "stopped" | "prevented";
};

const LOG_COLORS: Record<LogEntry["kind"], string> = {
  bubble: "text-green-600",
  capture: "text-violet-600",
  stopped: "text-red-600",
  prevented: "text-amber-600",
};

function EventFlowSection() {
  const [mode, setMode] = useState<Mode>("normal");
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (msg: string, kind: LogEntry["kind"]) =>
    setLogs(p => [...p, {msg, kind}].slice(-10));
  const clear = () => setLogs([]);

  // Bubble handlers
  const onOuterClick = () => addLog("↑ Outer div", "bubble");
  const onMiddleClick = () => addLog("↑ Middle div", "bubble");
  const onInnerClick = (e: React.MouseEvent) => {
    if (mode === "stop") {
      e.stopPropagation();
      addLog("⛔ Inner button — propagation stopped here", "stopped");
    } else {
      addLog("↑ Inner button", "bubble");
    }
  };

  // Capture handlers — only active in capture mode
  const onOuterCapture = () => {
    if (mode === "capture") addLog("↓ Outer div (capture)", "capture");
  };
  const onMiddleCapture = () => {
    if (mode === "capture") addLog("↓ Middle div (capture)", "capture");
  };
  const onInnerCapture = () => {
    if (mode === "capture") addLog("↓ Inner button (capture)", "capture");
  };

  return (
    <section>
      <h2 className="mb-1 text-xl font-medium">Event flow control</h2>
      <p className="mb-6 text-sm text-gray-500">
        Events travel <span className="font-medium text-gray-700">down</span>{" "}
        (capture) then <span className="font-medium text-gray-700">up</span>{" "}
        (bubble). Select a mode to see each control method live.
      </p>

      {/* Mode tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(MODE_META) as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              clear();
            }}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              mode === m
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            {MODE_META[m].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── Left: visual demo ── */}
        <div className="space-y-4 rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium">Live demo</p>

          {/* Nested boxes */}
          <div
            onClick={onOuterClick}
            onClickCapture={onOuterCapture}
            className="cursor-pointer rounded-xl border-2 border-blue-200 bg-blue-50 p-4 select-none"
          >
            <p className="mb-2 text-xs font-medium text-blue-400">Outer div</p>
            <div
              onClick={onMiddleClick}
              onClickCapture={onMiddleCapture}
              className="rounded-xl border-2 border-violet-200 bg-violet-50 p-4"
            >
              <p className="mb-3 text-xs font-medium text-violet-400">
                Middle div
              </p>
              <div className="flex justify-center">
                <button
                  onClick={onInnerClick}
                  onClickCapture={onInnerCapture}
                  className="rounded-lg border-2 border-gray-300 bg-white px-6 py-2 text-sm font-medium transition-transform hover:border-gray-400 active:scale-95"
                >
                  Click me
                </button>
              </div>
            </div>
          </div>

          {/* preventDefault extras */}
          {mode === "prevent" && (
            <div className="space-y-3 rounded-xl border border-gray-100 p-4">
              <p className="text-xs font-medium text-gray-500">
                preventDefault demos
              </p>
              <a
                href="https://react.dev"
                onClick={e => {
                  e.preventDefault();
                  addLog("🚫 Link — navigation prevented", "prevented");
                }}
                className="block text-sm text-blue-500 underline"
              >
                Click this link (no navigation)
              </a>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addLog("🚫 Form — page reload prevented", "prevented");
                }}
                className="flex gap-2"
              >
                <input
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
                  placeholder="Type something..."
                />
                <button
                  type="submit"
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          <p className="rounded-lg bg-gray-50 px-3 py-2 text-xs leading-relaxed text-gray-500">
            {MODE_META[mode].hint}
          </p>
        </div>

        {/* ── Right: log + code ── */}
        <div className="space-y-4">
          {/* Event log */}
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Event log</p>
              <button
                onClick={clear}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                clear
              </button>
            </div>
            {logs.length === 0 ? (
              <p className="text-xs text-gray-400 italic">
                Interact with the demo above...
              </p>
            ) : (
              <ul className="space-y-1.5">
                {logs.map((l, i) => (
                  <li
                    key={i}
                    className={`font-mono text-xs ${LOG_COLORS[l.kind]}`}
                  >
                    {l.msg}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Code for current mode */}
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="mb-3 text-sm font-medium">Code</p>
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
              {MODE_CODE[mode]}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
