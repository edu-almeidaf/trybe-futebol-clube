export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'BAD_REQUEST' | 'UNAUTHORIZED'
| 'NOT_FOUND' | 'CONFLICT' | 'ERROR';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
