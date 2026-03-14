import Link from 'next/link';

export default async function TemplateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Template: {slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-500 mt-2">Coming soon</p>
        <Link href="/templates" className="text-sm text-blue-500 hover:underline mt-4 inline-block">
          ← Back to templates
        </Link>
      </div>
    </div>
  );
}
