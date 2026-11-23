import {useState} from 'react';
import {Building2} from 'lucide-react';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({src, alt, className = '', fallbackTitle}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-slate-100 to-teal-50 text-slate-600 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Building2 className="w-10 h-10 text-[#0B4F8A] mb-2" strokeWidth={1.6} />
        <p className="text-sm font-medium text-slate-700">{fallbackTitle || alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
