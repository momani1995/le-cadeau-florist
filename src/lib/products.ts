import rawData from "@/data/products.json";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  imageSrc: string;
  description: string;
  featured: boolean;
};

type RawData = {
  bouquets?: Product[];
  hatBoxes?: Product[];
  candles?: Product[];
  plants?: Product[];
};

const data = rawData as RawData;

export function getAllProducts(): Product[] {
  return [
    ...(data.bouquets ?? []),
    ...(data.hatBoxes ?? []),
    ...(data.candles ?? []),
    ...(data.plants ?? []),
  ];
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function getRelatedProducts(
  category: string,
  excludeId: string,
  limit = 3
): Product[] {
  return getAllProducts()
    .filter((p) => p.category === category && p.id !== excludeId)
    .slice(0, limit);
}
