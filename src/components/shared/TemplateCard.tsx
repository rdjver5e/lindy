import Link from 'next/link';
import { AgentTemplate } from './TemplateSectionData';

interface Props {
  template: AgentTemplate;
}

export default function TemplateCard({ template }: Props) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="bg-white border border-gray-100 rounded-[20px] p-[18px] hover:shadow-sm hover:border-gray-300 transition-all cursor-pointer flex flex-col h-full min-h-[140px] focus:outline-none focus:ring-2 focus:ring-gray-300 group"
      aria-label={`Template: ${template.title}`}
    >
      <div className={`w-[34px] h-[34px] ${template.iconColor} rounded-[10px] flex items-center justify-center mb-3.5 shadow-sm group-hover:scale-105 transition-transform`}>
        <span className="text-white text-[15px] leading-none mb-px" aria-hidden="true">{template.icon}</span>
      </div>
      
      <h3 className="text-[14px] font-semibold text-gray-900 tracking-tight leading-snug mb-1 group-hover:text-blue-600 transition-colors">
        {template.title}
      </h3>
      
      <p className="text-[12.5px] text-gray-400 font-medium leading-[1.4] line-clamp-2 mt-auto">
        {template.description}
      </p>
    </Link>
  );
}
