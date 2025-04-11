import ProjectDetail from "@/components/projects/ProjectDetail";

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetail id={params.id} />;
}
