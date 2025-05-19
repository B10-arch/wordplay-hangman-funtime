
import React from "react";
import { wordCategories } from "../utils/wordCategories";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "../components/ui/select";

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  disabled: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  disabled
}) => {
  return (
    <div className="mb-6 max-w-xs mx-auto">
      <Select 
        value={selectedCategory} 
        onValueChange={onSelectCategory}
        disabled={disabled}
      >
        <SelectTrigger className="bg-white border-hangman-primary">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="random">Random</SelectItem>
          {wordCategories.map((category) => (
            <SelectItem key={category.name} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;
