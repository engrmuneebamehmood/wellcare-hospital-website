interface WellCareLogoProps {
  className?: string;
  size?: number;
}

export function WellCareLogo({className = '', size = 40}: WellCareLogoProps) {
  return (
    <img
      src="/assets/aistudio/wellcare_2acf1d3d.jpg"
      alt="WellCare International Hospital logo"
      width={size}
      height={size}
      style={{width: size, height: size}}
      className={`object-contain rounded-full bg-white shrink-0 ${className}`}
    />
  );
}
