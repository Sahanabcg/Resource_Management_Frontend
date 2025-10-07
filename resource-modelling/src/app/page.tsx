import CardLink from "./Components/CardLink";
import { BarChart3, Database } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto grid min-h-screen max-w-7xl px-6">
      <header className="flex items-center justify-between py-6">
        <Image src="/images/logo.png" alt="BCG X Logo" width={120} height={100} />
      </header>
      <section className="grid items-center gap-12 pb-16 lg:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-normal leading-tight tracking-tight sm:text-5xl">
            Resource <span className="font-bold">Modelling <br /> Analytics</span>
            Tool
          </h1>
          <div className="flex items-start gap-3">
            <span className="mt-2 h-12 flex justify-center w-1 rounded bg-lime-200" />
            <p className="max-w-xl text-base text-slate-500">
              Welcome to the Resource Modeling analytics tool. <br/>The model
              estimates strategic workforce <br/>requirements across functions.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <CardLink
            href="/Reports"
            title="View Reports"
            description="View reports for site/functions/initiatives"
            icon={<BarChart3 className="opacity-80" size={20} />}
          />
          <CardLink
            href="/Manage_Data"
            title="Manage Data"
            description="Manage Core Drivers, Activity Drivers, Functions, etc."
            icon={<Database className="opacity-80" size={20} />}
          />
        </div>
      </section>
    </main>
  );
}
