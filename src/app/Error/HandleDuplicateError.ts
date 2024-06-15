import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../GlobalInterface/error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractMessage} is already exits`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};
export default handleDuplicateError;
