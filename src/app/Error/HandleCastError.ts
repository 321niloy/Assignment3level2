import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../GlobalInterface/error.interface';


const handlecastnErr = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};
export default handlecastnErr;
