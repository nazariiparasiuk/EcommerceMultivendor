interface Deal{
  category:HomeCategory;
  discount:number;
}

export interface HomeData {
  id: number;
  deals: Deal[];
  dealCategories:HomeCategory[];
}
  
export interface HomeCategory {
  id?:number;
  categoryId: string;
  section?: string;
  name?: string;
  image: string;
}

export interface HomeCategoryRequest {
  category: string;
  section?: string;
  name?: string;
  image: string;
}
  