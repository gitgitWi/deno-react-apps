export abstract class DBClientAdapter {
  abstract insert<T>(insertItem: T): T;
  // abstract getOne<T>(...args: any[]): T;
  // abstract getMany<T>(...args: any[]): T[];
  // abstract update<T>(...args: any[]): T;
  // abstract delete(...args: any[]): unknown;
}
