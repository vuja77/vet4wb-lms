import DocxViewer from "@/app/components/DocxViewer";

export default function Home({ params }: { params: any }) {
  return (
    <div>
      <h1>DOCX Viewer</h1>
      <DocxViewer file={"https://edu4wb.com/api/uploads/" + params.slug} />
    </div>
  );
}
