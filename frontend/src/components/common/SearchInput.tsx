import { useState } from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchInputProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
};

export default function SearchInput({
  placeholder = "Search...",
  onSearch,
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  }

  function handleClear() {
    setSearchTerm("");
    onSearch("");
  }

  return (
    <div className="relative flex w-full max-w-sm items-center">
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="pr-10"
      />

      {searchTerm && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
