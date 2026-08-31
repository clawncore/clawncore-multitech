import { Header } from "../components/Header";
import { ClawnAICore } from "../sections/ClawnAICore";
import { AtmosphericFooter } from "../sections/AtmosphericFooter";

export default function ClawnAIPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        <ClawnAICore />
      </main>
      <AtmosphericFooter />
    </div>
  );
}
