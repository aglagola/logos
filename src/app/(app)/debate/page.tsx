import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Swords, Plus } from "lucide-react";

export default function DebatePage() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      <div className="mt-20">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mx-auto mb-6">
          <Swords className="w-8 h-8 text-gold" />
        </div>
        <h1 className="font-serif text-[40px] text-stone mb-3">Debate Arena</h1>
        <p className="text-stone-muted text-[16px] max-w-md mx-auto mb-8 leading-relaxed">
          Challenge any idea in structured opposition. Choose your mode, set the terms, and let the reasoning begin.
        </p>
        <Link href="/debate/new">
          <Button variant="primary" size="lg" icon={<Plus className="w-4 h-4" />}>
            Start New Debate
          </Button>
        </Link>
      </div>
    </div>
  );
}
