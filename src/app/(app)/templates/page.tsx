import { Suspense } from 'react';
import { TemplateGallery } from '@/components/app/TemplateGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Template Gallery | Lindy',
  description: 'Browse available agent templates',
};

export default function TemplatesPage() {
  return (
    <Suspense fallback={null}>
      <TemplateGallery />
    </Suspense>
  );
}
