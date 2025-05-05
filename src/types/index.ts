export type Product = {
    id: number;
    title: string;
    category: string;
    price?: number;
    brand?: string;
    releaseYear?: number;
    description?: string;
    imageUrl?: string;
    rating?: number;
    features?: string[];
    availability?: boolean;
  };
  