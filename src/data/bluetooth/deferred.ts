export default class Deferred<T> {
  public promise: Promise<T>;
  public reject: ((reason?: unknown) => void) | T | undefined;
  public resolve: ((value: PromiseLike<T> | T) => void) | T | undefined;

  public constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}
