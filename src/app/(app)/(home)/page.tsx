import { PageContainer } from "~/components/layout/page-container";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <PageContainer className="home overflow-hidden">
      <Hero />
    </PageContainer>
  );
}
