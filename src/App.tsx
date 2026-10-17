import { Cursor, CursorGlow, Nav } from "@/components/Chrome";
import Hero from "@/sections/Hero";
import Products from "@/sections/Products";
import Solutions from "@/sections/Solutions";
import Closing from "@/sections/Closing";

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-ink text-bone">
      <Cursor />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <div className="hairline mx-auto max-w-[1200px]" />
        <Products />
        <div className="hairline mx-auto max-w-[1200px]" />
        <Solutions />
        <Closing />
      </main>
    </div>
  );
}
