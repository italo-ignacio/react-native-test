export default class Deferred<T> {
  promise: Promise<T>;
  reject: (reason?: any) => void;
  resolve: (value: PromiseLike<T> | T) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}
