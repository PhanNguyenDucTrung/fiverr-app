export type Category = {
    id: string;
    name: string;
    subcategories: Subcategory[];
};

export type Subcategory = {
    id: string;
    name: string;
    childCategories: ChildCategory[];
};

export type ChildCategory = {
    id: string;
    name: string;
};

export type CategoriesMenuProps = {
    className?: string;
};
