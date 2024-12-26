import CategoryDetail from "@/components/categories/CategoryDetail";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryDetail slug={params.slug} />;
} 