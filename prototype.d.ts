type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<unknown> | string
  ? string[]
  : never;

type ObjectEntries<T> = T extends object ? Array<[keyof T, T[keyof T]]> : never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
  entries<T>(o: T): ObjectEntries<T>;
}
