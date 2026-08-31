import { Search, SlidersHorizontal, X } from 'lucide-react';
import { DepartmentId, DEPARTMENTS } from '@/services/careersData';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartment: DepartmentId | 'all';
  onDepartmentChange: (dept: DepartmentId | 'all') => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  resultCount: number;
}

const LOCATIONS = ['All Locations', 'Remote / Global', 'Hybrid / Lab', 'On-site / Lab', 'Hybrid / Field'];
const TYPES = ['All Types', 'Full-Time', 'Part-Time', 'Contract'];

export function JobFilters({
  searchQuery, onSearchChange,
  selectedDepartment, onDepartmentChange,
  selectedLocation, onLocationChange,
  selectedType, onTypeChange,
  resultCount,
}: Props) {
  const hasFilters = selectedDepartment !== 'all' || selectedLocation !== 'All Locations' || selectedType !== 'All Types' || searchQuery.length > 0;

  const clearAll = () => {
    onSearchChange('');
    onDepartmentChange('all');
    onLocationChange('All Locations');
    onTypeChange('All Types');
  };

  return (
    <div className="bg-white dark:bg-cc-dark border border-gray-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/30" />
        <input
          type="text"
          placeholder="Search roles, skills, or keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-12 pl-12 pr-12 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-nvidia-500/30 focus:border-nvidia-500/50 transition-all"
        />
        {searchQuery && (
          <button onClick={() => onSearchChange('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/40">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
        </div>

        {/* Department Filter */}
        <select
          value={selectedDepartment}
          onChange={(e) => onDepartmentChange(e.target.value as DepartmentId | 'all')}
          className="h-9 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-700 dark:text-white/70 focus:outline-none focus:ring-2 focus:ring-nvidia-500/30 appearance-none cursor-pointer"
        >
          <option value="all">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        {/* Location Filter */}
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="h-9 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-700 dark:text-white/70 focus:outline-none focus:ring-2 focus:ring-nvidia-500/30 appearance-none cursor-pointer"
        >
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="h-9 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-700 dark:text-white/70 focus:outline-none focus:ring-2 focus:ring-nvidia-500/30 appearance-none cursor-pointer"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Clear All */}
        {hasFilters && (
          <button onClick={clearAll} className="h-9 px-3 text-xs font-medium text-nvidia-500 hover:text-nvidia-600 hover:bg-nvidia-500/10 rounded-lg transition-colors">
            Clear all
          </button>
        )}

        {/* Result Count */}
        <span className="ml-auto text-xs text-gray-500 dark:text-white/40">
          {resultCount} {resultCount === 1 ? 'role' : 'roles'} found
        </span>
      </div>
    </div>
  );
}
