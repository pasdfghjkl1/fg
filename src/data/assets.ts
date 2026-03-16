import type { Asset } from '../types/game';

export const sampleAssets: Asset[] = [
  {
    id: 'asset-index-fund',
    name: 'Index Fund Bundle',
    category: 'stocks',
    purchaseCost: 5000,
    monthlyIncome: 180,
    maintenanceCost: 10,
    riskLevel: 2,
    description: 'Low-maintenance diversified investment for gradual passive income.',
  },
  {
    id: 'asset-rental-studio',
    name: 'Rental Studio Apartment',
    category: 'realEstate',
    purchaseCost: 30000,
    monthlyIncome: 900,
    maintenanceCost: 250,
    riskLevel: 3,
    description: 'Reliable rent source with moderate upkeep.',
  },
  {
    id: 'asset-coffee-cart',
    name: 'Weekend Coffee Cart',
    category: 'business',
    purchaseCost: 12000,
    monthlyIncome: 550,
    maintenanceCost: 130,
    riskLevel: 4,
    description: 'Small business asset with decent returns and higher variability.',
  },
  {
    id: 'asset-certification',
    name: 'Professional Certification',
    category: 'education',
    purchaseCost: 2500,
    monthlyIncome: 120,
    maintenanceCost: 0,
    riskLevel: 1,
    description: 'Career-focused investment that modestly boosts earning power.',
  },
];
