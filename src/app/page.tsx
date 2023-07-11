import InstallationButton from "./InstallationButton";
import LandingPageLayout from "~/components/layouts/LandingPageLayout";

export default function Home() {
  return (
    <LandingPageLayout>
      <main className="flex min-h-screen min-w-full flex-col items-center justify-center">
        <InstallationButton />
      </main>
    </LandingPageLayout>
  );
}
