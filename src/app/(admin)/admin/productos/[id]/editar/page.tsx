import type { Metadata } from "next";
import { ProductEditorForm } from "@/features/admin/components/product-editor-form";
import { siteConfig } from "@/config/site";

type AdminEditProductPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: AdminEditProductPageProps): Promise<Metadata> => {
  const { id } = await params;
  return {
    title: `Admin · Editar ${id}`,
    description: `Edición de producto — ${siteConfig.name}.`,
  };
};

const AdminEditProductPage = async ({ params }: AdminEditProductPageProps) => {
  const { id } = await params;

  return <ProductEditorForm mode="edit" documentId={id} />;
};

export default AdminEditProductPage;
