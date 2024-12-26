import UniversityDetail from "@/components/universities/UniversityDetail";

export default function UniversityPage({params}:{params:{slug:string}}){
  return <UniversityDetail slug={params.slug} />
}