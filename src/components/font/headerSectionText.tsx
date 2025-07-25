import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const headerSectionText: React.FC<SectionHeaderProps> = ({ title, description, className }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold tracking-tight mb-1">{title}</h2>
      {description && <p className="text-muted-foreground mb-4">{description}</p>}
    </div>
  );
};

export default headerSectionText;
