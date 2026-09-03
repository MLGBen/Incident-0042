export default function Incident0042Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-[0.2em]">
            INCIDENT 0042
          </h1>
          <p className="text-xs text-zinc-500 mt-1 tracking-widest">
            ACTIVE INVESTIGATION
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-600">CASE</p>
          <p className="text-red-500">0042-001</p>
        </div>
      </header>

      <section className="p-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-xs text-red-500 tracking-[0.3em]">
              HIGH SEVERITY
            </p>

            <h2 className="text-4xl font-semibold mt-3">
              Suspicious Employee Login
            </h2>

            <p className="text-zinc-400 mt-3 max-w-3xl">
              Investigate the authentication event and determine whether
              Jordan Smith&apos;s account has been compromised.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">EMPLOYEE</p>
              <p className="mt-2">Jordan Smith</p>
            </div>

            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">USERNAME</p>
              <p className="mt-2">jsmith</p>
            </div>

            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">DEPARTMENT</p>
              <p className="mt-2">Finance</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 border border-zinc-800 bg-zinc-950">
              <div className="border-b border-zinc-800 px-6 py-4">
                <p className="text-xs text-zinc-500 tracking-widest">
                  INVESTIGATION TERMINAL
                </p>
              </div>

              <div className="p-6 font-mono min-h-[420px]">
                <p className="text-green-500">
                  INCIDENT 0042 ANALYST TERMINAL
                </p>

                <p className="text-zinc-500 mt-2">
                  Type &quot;help&quot; to view available commands.
                </p>

                <div className="mt-8">
                  <span className="text-green-500">
                    analyst@incident0042:~$
                  </span>
                  <span className="ml-2 animate-pulse">█</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  CASE OBJECTIVE
                </p>

                <p className="mt-4 text-sm text-zinc-300 leading-6">
                  Determine whether the employee account has been
                  compromised and identify the attack method.
                </p>
              </div>

              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  EVIDENCE DISCOVERED
                </p>

                <p className="text-3xl mt-3">0 / 8</p>
              </div>

              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  CASE STATUS
                </p>

                <p className="text-yellow-500 mt-3">
                  INVESTIGATING
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
