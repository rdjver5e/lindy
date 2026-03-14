import Link from 'next/link';
import { AgentTemplate } from './TemplateSectionData';

interface Props {
  template: AgentTemplate;
}

export default function FeaturedTemplateCard({ template }: Props) {
  // Determine text color based on accent
  const textColor = template.accentColor === 'bg-amber-50' ? 'text-amber-700' : 'text-teal-700';

  return (
    <Link
      href={`/templates/${template.slug}`}
      className={`${template.accentColor} rounded-[20px] p-6 h-full min-h-[120px] md:min-h-[160px] flex flex-col justify-end relative overflow-hidden group hover:shadow-md transition-shadow block focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
      aria-label={`Featured template: ${template.title}`}
    >
      {/* Decorative illustration placeholder — right side */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] flex items-center justify-end pr-6 opacity-90 transition-transform group-hover:scale-105 group-hover:-translate-y-1">
        {/* Abstract shapes matching the screenshot style blueprint */}
        <div className="w-[140px] h-[100px] bg-white/40 border border-white/60 rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between p-2">
            {/* blueprint lines */}
            <div className="flex gap-2 w-full h-8">
               <div className="w-8 h-full bg-white/60 rounded" />
               <div className="flex-1 h-full bg-white/60 rounded" />
            </div>
            <div className="flex gap-2 w-full h-full mt-2">
               <div className="flex-1 h-full bg-white/60 rounded" />
               <div className="w-10 h-full bg-white/60 rounded" />
            </div>
        </div>
      </div>

      <p className={`text-[19px] font-medium ${textColor} relative z-10 leading-[1.2] max-w-[65%] tracking-tight`}>
        {template.title}
      </p>
    </Link>
  );
}
