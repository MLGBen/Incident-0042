export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* TOP HEADER */}
      <header className="border-b border-zinc-800 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-[0.2em]">
            INCIDENT 0042
          </h1>

          <p className="text-xs text-zinc-500 mt-1 tracking-widest">
            CYBER INCIDENT RESPONSE SIMULATOR
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-green-500">SYSTEM ONLINE</span>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-89px)]">

        {/* SIDEBAR */}
        <aside className="w-64 border-r border-zinc-800 p-6">
          <p className="text-xs text-zinc-600 mb-6 tracking-widest">
            OPERATIONS
          </p>

          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-zinc-900 border border-zinc-800">
              Dashboard
            </button>

            <button className="w-full text-left px-4 py-3 text-zinc-400 hover:bg-zinc-900">
              Incidents
            </button>

            <button className="w-full text-left px-4 py-3 text-zinc-400 hover:bg-zinc-900">
              Terminal
            </button>

            <button className="w-full text-left px-4 py-3 text-zinc-400 hover:bg-zinc-900">
              Evidence
            </button>

            <button className="w-full text-left px-4 py-3 text-zinc-400 hover:bg-zinc-900">
              Analyst Progress
            </button>
          </nav>

          <div className="mt-16 border-t border-zinc-800 pt-6">
            <p className="text-xs text-zinc-600">
              ANALYST
            </p>

            <p className="mt-2">
              SOC Analyst I
            </p>

            <p className="text-xs text-zinc-500 mt-1">
              Clearance Level 1
            </p>
          </div>
        </aside>

        {/* MAIN DASHBOARD */}
        <section className="flex-1 p-10">

          <div className="mb-10">
            <p className="text-xs text-zinc-500 tracking-[0.3em]">
              CYBER OPERATIONS CENTER
            </p>

            <h2 className="text-3xl font-semibold mt-2">
              Active Incidents
            </h2>
          </div>

          {/* INCIDENT CARD */}
          <div className="max-w-4xl border border-zinc-800 bg-zinc-950">

            <div className="border-b border-zinc-800 p-6 flex justify-between">
              <div>
                <span className="text-red-500 text-xs font-bold tracking-widest">
                  ● HIGH SEVERITY
                </span>

                <h3 className="text-2xl font-semibold mt-3">
                  CASE 0042-001
                </h3>

                <p className="text-zinc-400 mt-1">
                  Suspicious Employee Login
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-zinc-600">
                  STATUS
                </p>

                <p className="text-yellow-500 mt-1">
                  UNASSIGNED
                </p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-3 gap-8">
              <div>
                <p className="text-xs text-zinc-600">
                  EMPLOYEE
                </p>

                <p className="mt-2">
                  Jordan Smith
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-600">
                  DEPARTMENT
                </p>

                <p className="mt-2">
                  Finance
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-600">
                  ALERT TIME
                </p>

                <p className="mt-2">
                  03:22
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-800 p-6">
              <p className="text-sm text-zinc-400 leading-6">
                Successful authentication occurred after multiple
                failed login attempts. Investigate the authentication
                event and determine whether the employee account has
                been compromised.
              </p>

              <button className="mt-6 bg-white text-black px-6 py-3 font-semibold hover:bg-zinc-200">
                ACCEPT CASE →
              </button>
            </div>

          </div>

          {/* ANALYST STATUS */}
          <div className="max-w-4xl mt-8 grid grid-cols-3 gap-4">

            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">
                ANALYST READINESS
              </p>

              <p className="text-2xl mt-2">
                0%
              </p>
            </div>

            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">
                CASES COMPLETED
              </p>

              <p className="text-2xl mt-2">
                0
              </p>
            </div>

            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">
                CURRENT RANK
              </p>

              <p className="text-2xl mt-2">
                SOC I
              </p>
            </div>

          </div>

        </section>
      </div>
    </main>
  );
}
