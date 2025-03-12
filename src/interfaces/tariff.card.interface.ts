
export interface Tariff {
    name: string;
    icon: string;
    alt: string;
    description: string;
    color: string;
    currentPrice: number;
    oldPrice: number;
    discountDescription: string | null;
    included: string[];
  }
  
export interface TariffCardProps {
    tariff: Tariff;
    isActive: boolean;
  }