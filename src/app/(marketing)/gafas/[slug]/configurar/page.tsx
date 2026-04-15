import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

type ConfigurarIndexPageProps = {
  params: Promise<{ slug: string }>;
};

const ConfigurarIndexPage = async ({ params }: ConfigurarIndexPageProps) => {
  const { slug } = await params;
  redirect(routes.lensWizardStep(slug, "montura"));
};

export default ConfigurarIndexPage;
