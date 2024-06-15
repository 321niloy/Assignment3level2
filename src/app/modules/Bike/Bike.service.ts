import QueryBuilder from '../../builder/QueryBuilder';
import { Tbike } from './Bike.Interface';
import { Bike } from './Bike.Model';
import { bikeSearchableFields } from './Bike.constant';

const createBikeIntoDb = async (data: Tbike) => {
  const result = await Bike.create(data);

  const userObj = result.toObject();
  delete (userObj as { createdAt?: string }).createdAt;
  delete (userObj as { updatedAt?: string }).updatedAt;
  delete (userObj as { isDelated?: boolean }).isDelated;
  return userObj;
};

const getBikeIntoDb = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Bike.find(), query)
    .search(bikeSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await userQuery.Modelquery;
  const bike = result.filter((bike: Tbike) => bike.isDelated === false);

  console.log(bike, 'lala');
  return { bike };
};

const updatedBikeIntoDb = async (id: string, payload: Tbike) => {
  const result = await Bike.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  console.log(result);

  return result;
};

const delatedBikeIntoDb = async (id: string) => {
  console.log('delatedBike', id);
  const result = await Bike.updateOne({ _id: id }, { isDelated: true });
  const getDeletedProduct = await Bike.findOne({ _id: id });
  return getDeletedProduct;
};

export const bikeService = {
  createBikeIntoDb,
  getBikeIntoDb,
  updatedBikeIntoDb,
  delatedBikeIntoDb,
};
