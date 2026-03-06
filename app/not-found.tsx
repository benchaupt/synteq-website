import { Nav } from "@/app/_components/nav";
import { Footer } from "@/app/_components/footer";
import { Section } from "@/app/_components/section";
import { Button } from "@/app/_components/button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex flex-col">
        <Section
          className="flex-1 flex"
          innerClassName="flex-1 flex flex-col items-center justify-center text-center py-0"
        >
          <h1 className="text-9xl md:text-[10rem] font-medium leading-none text-lava">404</h1>
          <p className="text-body-lg text-lava mt-4 mb-8">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button href="/" size="lg">
            Back to Home
          </Button>
        </Section>
      </main>
      <Footer />
    </>
  );
}
