import { Model } from 'mongoose';

export interface Tbike {
  name: string;
  description: string;
  pricePerHour: number;
  cc: number;
  year: number;
  model: string;
  brand: string;
  isDelated: boolean;
}

// export interface BikeModel extends Model<Tbike> {
//   isUserExists(id: string): Promise<Tbike | null>;
// }
