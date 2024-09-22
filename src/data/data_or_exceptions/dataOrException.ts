
export enum Loading {
  none,

  loading, error, success
}

export class DataOrException<T> {
  data?: T;
  exception?: Error;
  loading: Loading;
  constructor(data: T | undefined, exception: Error | undefined, loading: Loading) {
    this.data = data;
    this.exception = exception;
    this.loading = loading;
  }
}