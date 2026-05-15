import type {ReactNode} from "react";
import {Suspense, memo, useCallback, useMemo, useRef, useState} from "react";

import {Link, createFileRoute} from "@tanstack/react-router";

import {Button} from "@/components/ui/button";

export const Route = createFileRoute("/performance")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto p-8">
      <h1 className="text-3xl font-bold md:text-4xl">
        Performance Optimization
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Understand why React re-renders, where bottlenecks come from, and which
        tools to reach for.
      </p>
      <Button variant="link" className="mt-8 mb-6 pl-0 text-lg" size="lg">
        <Link to="/" className="underline-offset-3!">
          Back to Home
        </Link>
      </Button>
      <RenderingSection />
      <MemoSection />
      <UseMemoSection />
      <UseCallbackSection />
      <SuspenseSection />
      <ComparisonSection />

      <Button variant="link" className="mt-8 pl-0 text-lg" size="lg">
        <Link to="/" className="underline-offset-3!">
          Back to Home
        </Link>
      </Button>
    </div>
  );
}

function useRenderCount() {
  "use no memo";
  const count = useRef(0);
  count.current++;
  return count.current;
}

function RenderBadge({count}: {count: number}) {
  const color =
    count === 1
      ? "bg-gray-100 text-gray-400"
      : count <= 4
        ? "bg-amber-50 text-amber-600 border border-amber-200"
        : "bg-red-50 text-red-600 border border-red-200";
  return (
    <span className={`rounded px-1.5 py-0.5 font-mono text-xs ${color}`}>
      renders: {count}
    </span>
  );
}

function SectionHeader({
  title,
  desc,
}: {
  title: string;
  desc: string | ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="mb-1 text-xl font-medium">{title}</h2>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

// SECTION 1 — RENDERING BEHAVIOUR

function RenderNode({
  label,
  ring,
  onPing,
  children,
}: {
  label: string;
  ring: string;
  onPing?: () => void;
  children?: ReactNode;
}) {
  "use no memo"; // must re-render so the badge count is real
  const renders = useRenderCount();
  return (
    <div className={`space-y-2 rounded-xl border-2 p-3 ${ring}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-medium">&lt;{label}&gt;</span>
        <div className="flex items-center gap-1.5">
          <RenderBadge count={renders} />
          {onPing && (
            <button
              onClick={e => {
                e.stopPropagation();
                onPing();
              }}
              className="rounded border border-gray-200 px-1.5 py-0.5 text-xs hover:bg-white active:scale-95"
            >
              ping
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function LeafNode() {
  "use no memo";
  return (
    <RenderNode label="Leaf" ring="border-gray-200 bg-white">
      <p className="py-0.5 text-center font-mono text-xs text-gray-300">
        no state
      </p>
    </RenderNode>
  );
}

function ChildNode() {
  "use no memo";
  const [, ping] = useState(0);
  return (
    <RenderNode
      label="Child"
      ring="border-green-200 bg-green-50"
      onPing={() => ping(c => c + 1)}
    >
      <LeafNode />
    </RenderNode>
  );
}

function ParentNode() {
  "use no memo";
  const [, ping] = useState(0);
  return (
    <RenderNode
      label="Parent"
      ring="border-violet-200 bg-violet-50"
      onPing={() => ping(c => c + 1)}
    >
      <ChildNode />
    </RenderNode>
  );
}

function RenderingSection() {
  "use no memo";
  const [, ping] = useState(0);
  return (
    <section className="mb-20">
      <SectionHeader
        title="Why React re-renders"
        desc="A component re-renders when its own state changes or when its parent re-renders. Re-renders cascade downward, never upward. Ping any node and watch."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-gray-200 p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">Component tree</p>
            <p className="text-xs text-gray-400">
              amber badge = re-rendered &gt;1×
            </p>
          </div>
          <RenderNode
            label="GrandParent"
            ring="border-blue-200 bg-blue-50"
            onPing={() => ping(c => c + 1)}
          >
            <ParentNode />
          </RenderNode>
        </div>

        <div className="space-y-3 rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium">Three causes of a re-render</p>
          {[
            {
              label: "Own state changed",
              note: "Only the component that called setState re-renders.",
              ring: "border-blue-200 bg-blue-50 text-blue-700",
            },
            {
              label: "Parent re-rendered",
              note: "Every child re-renders by default — even with identical props.",
              ring: "border-violet-200 bg-violet-50 text-violet-700",
            },
            {
              label: "Context value changed",
              note: "Any component subscribed via useContext re-renders.",
              ring: "border-amber-100 bg-amber-50 text-amber-700",
            },
          ].map(({label, note, ring}) => (
            <div
              key={label}
              className={`rounded-lg border px-3 py-2.5 ${ring}`}
            >
              <p className="text-xs font-semibold">{label}</p>
              <p className="mt-0.5 text-xs opacity-80">{note}</p>
            </div>
          ))}
          <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
            <p className="text-xs font-semibold text-red-700">
              ⚠ The bottleneck
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-red-600 opacity-80">
              A slow component high in the tree makes every child slow on every
              interaction. Ping GrandParent — all four nodes re-render. That is
              the cascading cost you need to control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// SECTION 2 — REACT.MEMO

function ChildBox({
  label,
  renders,
  prop,
  memoized,
}: {
  label: string;
  renders: number;
  prop: number;
  memoized: boolean;
}) {
  return (
    <div
      className={`space-y-2 rounded-xl border-2 p-4 ${memoized ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-medium">&lt;{label}&gt;</span>
        <RenderBadge count={renders} />
      </div>
      <p className="text-xs text-gray-500">
        prop:{" "}
        <span className="font-mono font-medium text-gray-700">{prop}</span>
      </p>
      {memoized ? (
        <p className="text-xs text-blue-500">
          ✓ Skips re-render when prop unchanged
        </p>
      ) : (
        <p className="text-xs text-amber-600">
          ⚠ Re-renders whenever parent does
        </p>
      )}
    </div>
  );
}

// Defined outside MemoSection so it isn't recreated each render.
// "use no memo" makes the compiler leave this component alone —
// it will re-render every time its parent does, just like any
// plain component would without the compiler.
const RegularChild = function RegularChild({value}: {value: number}) {
  "use no memo";
  const renders = useRenderCount();
  return (
    <ChildBox
      label="RegularChild"
      renders={renders}
      prop={value}
      memoized={false}
    />
  );
};

// memo() is explicit — the compiler respects it and does not
// add its own optimizations on top, so this behaves exactly
// as documented: skips re-render when props are shallowly equal.
const MemoChild = memo(function MemoChild({value}: {value: number}) {
  const renders = useRenderCount();
  return (
    <ChildBox
      label="MemoChild"
      renders={renders}
      prop={value}
      memoized={true}
    />
  );
});

function MemoSection() {
  "use no memo";
  const [unrelated, setUnrelated] = useState(0);
  const [childProp, setChildProp] = useState(0);
  const parentRenders = useRenderCount();

  return (
    <section className="mb-20">
      <SectionHeader
        title="React.memo [skip unnecessary child re-renders]"
        desc="memo wraps a component and skips re-rendering it if its props haven't changed. Click 'unrelated re-render' to trigger a parent state change without touching the child's prop."
      />

      <div className="space-y-4 rounded-xl border border-gray-200 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs">
            &lt;Parent&gt; <RenderBadge count={parentRenders} />
          </span>
          <button
            onClick={() => setUnrelated(c => c + 1)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
          >
            Unrelated re-render ({unrelated})
          </button>
          <button
            onClick={() => setChildProp(c => c + 1)}
            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-100"
          >
            Change child prop → {childProp + 1}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs text-gray-400">without memo</p>
            <RegularChild value={childProp} />
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
              {`function Child({ value }) {
  return <div>{value}</div>
}

// Re-renders on every parent render
// even when value hasn't changed`}
            </pre>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-400">with React.memo</p>
            <MemoChild value={childProp} />
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
              {`const Child = memo(function Child({
  value,
}) {
  return <div>{value}</div>
})

// Skips if props are shallowly equal`}
            </pre>
          </div>
        </div>
        <p className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-700">
          <strong>
            React.memo adds a prop comparison step before every render.
          </strong>
          <br />
          If the comparison itself costs more than the render, you've actually
          made performance worse.
        </p>
      </div>
    </section>
  );
}

// SECTION 3 — useMemo

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function ComputePanelWithout({n}: {n: number}) {
  "use no memo"; // compiler must not cache this — the whole point is it recomputes
  const renderCount = useRenderCount();
  const computeCount = useRef(0);

  computeCount.current++;
  const t = performance.now();
  const result = fibonacci(n);
  const ms = (performance.now() - t).toFixed(1);

  return (
    <div className="space-y-2 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
      <p className="font-mono text-xs font-medium text-gray-500">
        without useMemo
      </p>
      <p className="font-mono text-sm">
        fibonacci({n}) ={" "}
        <span className="font-semibold text-gray-800">{result}</span>
      </p>
      <div className="flex flex-wrap gap-3 text-xs">
        <span className="text-gray-500">
          renders:{" "}
          <span className="font-mono font-medium text-gray-700">
            {renderCount}
          </span>
        </span>
        <span className="text-amber-600">
          computed:{" "}
          <span className="font-mono font-medium">{computeCount.current}×</span>
        </span>
        <span className="text-gray-400">{ms}ms this render</span>
      </div>
    </div>
  );
}

function ComputePanelWith({n}: {n: number}) {
  const renderCount = useRenderCount();
  const computeCount = useRef(0);
  const msRef = useRef("0.0");

  const result = useMemo(() => {
    computeCount.current++;
    const t = performance.now();
    const r = fibonacci(n);
    msRef.current = (performance.now() - t).toFixed(1);
    return r;
  }, [n]);

  const isCached = computeCount.current < renderCount;

  return (
    <div className="space-y-2 rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
      <p className="font-mono text-xs font-medium text-gray-500">
        with useMemo
      </p>
      <p className="font-mono text-sm">
        fibonacci({n}) ={" "}
        <span className="font-semibold text-gray-800">{result}</span>
      </p>
      <div className="flex flex-wrap gap-3 text-xs">
        <span className="text-gray-500">
          renders:{" "}
          <span className="font-mono font-medium text-gray-700">
            {renderCount}
          </span>
        </span>
        <span className="text-blue-600">
          computed:{" "}
          <span className="font-mono font-medium">{computeCount.current}×</span>
        </span>
        <span className={isCached ? "text-green-600" : "text-gray-400"}>
          {isCached
            ? `↩ cached (last: ${msRef.current}ms)`
            : `${msRef.current}ms this render`}
        </span>
      </div>
    </div>
  );
}

function UseMemoSection() {
  "use no memo";
  const [n, setN] = useState(28);
  const [unrelated, setUnrelated] = useState(0);

  return (
    <section className="mb-20">
      <SectionHeader
        title="useMemo [cache expensive computations]"
        desc="useMemo re-runs the computation only when its dependencies change. Trigger an unrelated re-render — the right panel skips the work entirely."
      />

      <div className="space-y-4 rounded-xl border border-gray-200 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">fibonacci(n), n =</label>
            <input
              type="range"
              min={10}
              max={32}
              value={n}
              onChange={e => setN(Number(e.target.value))}
              className="w-28"
            />
            <span className="w-6 text-center font-mono text-sm font-medium">
              {n}
            </span>
          </div>
          <button
            onClick={() => setUnrelated(c => c + 1)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
          >
            Unrelated re-render ({unrelated})
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <ComputePanelWithout n={n} />
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
              {`// Recomputes on every render
const result = fibonacci(n)

// Unrelated state changes
// still run this expensive work`}
            </pre>
          </div>

          <div className="space-y-2">
            <ComputePanelWith n={n} />
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
              {`// Only recomputes when n changes
const result = useMemo(
  () => fibonacci(n),
  [n]
)

// Unrelated renders = free`}
            </pre>
          </div>
        </div>

        <p className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-700">
          <strong>Rule of thumb:</strong> useMemo is worth it for genuinely slow
          computations (large list transforms, heavy math). Wrapping cheap
          operations adds overhead without benefit - profile first.
        </p>
      </div>
    </section>
  );
}

// SECTION 4 — useCallback

// "use no memo" here means memo() cannot save this child —
const CallbackChildWithout = memo(function CallbackChildWithout({
  onClick,
}: {
  onClick: () => void;
}) {
  "use no memo";
  const renders = useRenderCount();
  return (
    <div className="space-y-2 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-medium">&lt;MemoChild&gt;</span>
        <RenderBadge count={renders} />
      </div>
      <p className="text-xs text-gray-500">
        Wrapped in <code className="rounded bg-white px-1">memo()</code> but
        still re-renders — receives a new function object every time.
      </p>
      <button
        onClick={onClick}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs hover:bg-gray-50"
      >
        call handler
      </button>
      <p className="text-xs text-amber-600">
        ⚠ New fn reference every render → memo's prop check always fails
      </p>
    </div>
  );
});

const CallbackChildWith = memo(function CallbackChildWith({
  onClick,
}: {
  onClick: () => void;
}) {
  const renders = useRenderCount();
  return (
    <div className="space-y-2 rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-medium">&lt;MemoChild&gt;</span>
        <RenderBadge count={renders} />
      </div>
      <p className="text-xs text-gray-500">
        Same <code className="rounded bg-white px-1">memo()</code> wrapper, but
        now receives a stable function reference from{" "}
        <code className="rounded bg-white px-1">useCallback</code>.
      </p>
      <button
        onClick={onClick}
        className="w-full rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs hover:bg-blue-50"
      >
        call handler
      </button>
      <p className="text-xs text-blue-500">
        ✓ Stable reference → memo's check passes → re-render skipped
      </p>
    </div>
  );
});

function UseCallbackSection() {
  "use no memo"; // parent must create a genuinely new fn ref on each render
  const [unrelated, setUnrelated] = useState(0);
  const [callCount, setCallCount] = useState(0);
  const parentRenders = useRenderCount();

  // New object identity on every render — memo() on the child cannot help
  const withoutCb = () => setCallCount(c => c + 1);

  // Same identity across renders — memo()'s shallow-equal check passes
  const withCb = useCallback(() => setCallCount(c => c + 1), []);

  return (
    <section className="mb-20">
      <SectionHeader
        title="useCallback [stable function references]"
        desc={
          <>
            <code className="rounded bg-gray-100 px-1 text-xs">memo()</code>{" "}
            does a shallow-equal check on every prop. A plain{" "}
            <code className="rounded bg-gray-100 px-1 text-xs">
              {"() => {}"}
            </code>{" "}
            creates a brand-new object on every render, so the check always
            fails and the child always re-renders — even though the logic is
            identical.{" "}
            <code className="rounded bg-gray-100 px-1 text-xs">
              useCallback
            </code>{" "}
            returns the same function reference until its dependencies change,
            letting memo actually do its job.
          </>
        }
      />

      <div className="space-y-4 rounded-xl border border-gray-200 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs">
            &lt;Parent&gt; <RenderBadge count={parentRenders} />
          </span>
          <button
            onClick={() => setUnrelated(c => c + 1)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
          >
            Unrelated re-render ({unrelated})
          </button>
          <span className="text-xs text-gray-400">
            handler called: {callCount}×
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs text-gray-400">
              memo'd child + plain function
            </p>
            <CallbackChildWithout onClick={withoutCb} />
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
              {`// New function object every render
const handleClick = () => {
  setCount(c => c + 1)
}

// memo() wraps the child — but the
// prop is a different object each
// time, so the check fails and the
// child still re-renders`}
            </pre>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-400">memo'd child + useCallback</p>
            <CallbackChildWith onClick={withCb} />
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
              {`// Same object reference across renders
const handleClick = useCallback(
  () => setCount(c => c + 1),
  [] // no deps → stable forever
)

// memo()'s check: prev === next ✓
// Child skips the re-render`}
            </pre>
          </div>
        </div>

        <p className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-700">
          <strong>useCallback alone is not enough.</strong> It only helps when
          the receiving component is wrapped in{" "}
          <code className="rounded bg-white px-1">memo()</code> - otherwise the
          child re-renders regardless of reference stability.
        </p>
      </div>
    </section>
  );
}

// SECTION 5 — SUSPENSE & LAZY LOADING

type Resource<T> = {read: () => T};

function createResource<T>(promise: Promise<T>): Resource<T> {
  let status: "pending" | "success" | "error" = "pending";
  let value: T;
  let error: unknown;

  promise.then(
    v => {
      status = "success";
      value = v;
    },
    e => {
      status = "error";
      error = e;
    }
  );

  return {
    read() {
      if (status === "pending") throw promise;
      if (status === "error") throw error;
      return value;
    },
  };
}

type DashboardData = {
  users: number;
  revenue: number;
  orders: number;
  growth: string;
};

function createDashboardResource(delay: number) {
  return createResource<DashboardData>(
    new Promise(resolve =>
      setTimeout(
        () =>
          resolve({
            users: 12_482,
            revenue: 48_230,
            orders: 3_091,
            growth: "+14.2%",
          }),
        delay
      )
    )
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        <p className="text-xs text-gray-400">Loading heavy component…</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({length: 4}).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

function HeavyDashboard({resource}: {resource: Resource<DashboardData>}) {
  const data = resource.read();
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-green-600">✓ Component loaded</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            ["Total users", data.users.toLocaleString(), undefined],
            ["Revenue", `$${data.revenue.toLocaleString()}`, undefined],
            ["Orders", data.orders.toLocaleString(), undefined],
            ["Growth", data.growth, "vs last month"],
          ] as const
        ).map(([label, value, sub]) => (
          <div
            key={label}
            className="space-y-1 rounded-xl border border-gray-200 p-4"
          >
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-2xl font-semibold tabular-nums">{value}</p>
            {sub && <p className="text-xs text-green-600">{sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SuspenseSection() {
  const [resource, setResource] = useState<Resource<DashboardData> | null>(
    null
  );

  return (
    <section className="mb-20">
      <SectionHeader
        title="Suspense & lazy() - load what you need, when you need it"
        desc="React.lazy() splits a component into a separate bundle loaded on demand. Suspense catches the loading state and shows a fallback - no manual loading flags needed. The demo below uses the same Suspense mechanism with a data resource."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium">Live demo</p>

          {!resource ? (
            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-gray-500">
                The dashboard component hasn&apos;t loaded yet. Clicking below
                creates a Suspense boundary — React shows the skeleton fallback
                until the resource resolves.
              </p>
              <button
                onClick={() => setResource(createDashboardResource(2000))}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
              >
                Load heavy component →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Suspense fallback={<DashboardSkeleton />}>
                <HeavyDashboard resource={resource} />
              </Suspense>
              <button
                onClick={() => setResource(null)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                ↺ Reset
              </button>
            </div>
          )}

          <p className="rounded-lg bg-gray-50 px-3 py-2 text-xs leading-relaxed text-gray-500">
            When <code className="rounded bg-white px-1">HeavyDashboard</code>{" "}
            calls <code className="rounded bg-white px-1">resource.read()</code>
            , it throws the pending Promise. React catches it, renders the{" "}
            <code className="rounded bg-white px-1">fallback</code>, and retries
            once the Promise resolves.
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium">Code</p>
          <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
            {`// Split into a separate bundle
const Dashboard = lazy(
  () => import('./Dashboard')
)

// Suspense catches the loading state
function App() {
  return (
    <Suspense
      fallback={<DashboardSkeleton />}
    >
      <Dashboard />
    </Suspense>
  )
}

// React handles everything:
// 1. Renders fallback immediately
// 2. Loads the bundle in background
// 3. Swaps in Dashboard on resolve`}
          </pre>
          <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs leading-relaxed whitespace-pre">
            {`// Nest for granular fallbacks
<Suspense fallback={<PageShell />}>
  <Layout>
    <Suspense fallback={<Spinner />}>
      <HeavyWidget />     {/* isolated */}
    </Suspense>
    <Sidebar />           {/* loads now */}
  </Layout>
</Suspense>`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="mb-20">
      <SectionHeader
        title="memo vs useMemo vs useCallback"
        desc="All three are optimization tools, but they optimize different things. Understanding what each one memoizes is the key to using them correctly."
      />

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50">
          <div className="p-4 text-sm font-medium text-gray-500">Tool</div>
          <div className="p-4 text-sm font-medium text-gray-500">Memoizes</div>
          <div className="p-4 text-sm font-medium text-gray-500">
            Primary purpose
          </div>
          <div className="p-4 text-sm font-medium text-gray-500">
            Common use case
          </div>
        </div>

        {[
          {
            tool: "React.memo",
            memoizes: "Component",
            purpose: "Skip unnecessary child re-renders",
            use: "Large lists, expensive UI trees",
            color: "border-blue-100 bg-blue-50 text-blue-700",
          },
          {
            tool: "useMemo",
            memoizes: "Computed value",
            purpose: "Avoid expensive recalculations",
            use: "Heavy filtering, sorting, math",
            color: "border-violet-100 bg-violet-50 text-violet-700",
          },
          {
            tool: "useCallback",
            memoizes: "Function reference",
            purpose: "Keep function identity stable",
            use: "Passing callbacks to memoized children",
            color: "border-emerald-100 bg-emerald-50 text-emerald-700",
          },
        ].map(item => (
          <div
            key={item.tool}
            className="grid grid-cols-4 border-b border-gray-100 last:border-0"
          >
            <div className="p-4">
              <span
                className={`rounded-md border px-2 py-1 font-mono text-xs font-medium ${item.color}`}
              >
                {item.tool}
              </span>
            </div>

            <div className="p-4 text-sm text-gray-600">{item.memoizes}</div>

            <div className="p-4 text-sm text-gray-600">{item.purpose}</div>

            <div className="p-4 text-sm text-gray-600">{item.use}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="font-mono text-xs font-medium text-blue-700">
            React.memo
          </p>

          <p className="mt-2 text-xs leading-relaxed text-blue-600">
            Wraps a component and skips re-rendering if its props are shallowly
            equal.
          </p>

          <pre className="mt-3 overflow-x-auto rounded-lg bg-white p-3 font-mono text-xs leading-relaxed whitespace-pre">
            {`const Child = memo(function Child() {
  return <div />
})`}
          </pre>
        </div>

        <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
          <p className="font-mono text-xs font-medium text-violet-700">
            useMemo
          </p>

          <p className="mt-2 text-xs leading-relaxed text-violet-600">
            Caches the result of an expensive computation until dependencies
            change.
          </p>

          <pre className="mt-3 overflow-x-auto rounded-lg bg-white p-3 font-mono text-xs leading-relaxed whitespace-pre">
            {`const result = useMemo(
  () => expensiveWork(data),
  [data]
)`}
          </pre>
        </div>

        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="font-mono text-xs font-medium text-emerald-700">
            useCallback
          </p>

          <p className="mt-2 text-xs leading-relaxed text-emerald-600">
            Returns the same function reference across renders until
            dependencies change.
          </p>

          <pre className="mt-3 overflow-x-auto rounded-lg bg-white p-3 font-mono text-xs leading-relaxed whitespace-pre">
            {`const handleClick = useCallback(
  () => doSomething(),
  []
)`}
          </pre>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
        <p className="text-xs leading-relaxed text-amber-700">
          <strong>Important:</strong> these are performance optimization tools,
          not default wrappers for every component. React is already fast by
          default. Use them when profiling shows actual bottlenecks.
        </p>
      </div>
    </section>
  );
}
