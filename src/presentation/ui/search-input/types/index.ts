export interface SearchInputProps {
  onDebouncedChange: (query: string) => void;
  debounceMs?: number;
}
