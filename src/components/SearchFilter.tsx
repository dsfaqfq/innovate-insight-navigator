import { Search, SlidersHorizontal } from "lucide-react";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  tags?: string[];
  selectedTags?: string[];
  onTagToggle?: (tag: string) => void;
}

const SearchFilter = ({ value, onChange, placeholder = "Search projects...", tags, selectedTags = [], onTagToggle }: SearchFilterProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border rounded-sm bg-card text-foreground hover:bg-muted transition-colors">
          <SlidersHorizontal size={13} /> Filters
        </button>
      </div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle?.(tag)}
              className={`text-[11px] px-2.5 py-1 rounded-sm font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
