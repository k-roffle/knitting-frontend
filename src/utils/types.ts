type BasicSnakeToCamelCase<
  S extends string
> = S extends `${infer FirstLetter}_${infer SecondLetter}`
  ? `${Lowercase<FirstLetter>}${Capitalize<
      BasicSnakeToCamelCase<SecondLetter>
    >}`
  : Lowercase<S>;

export type SnakeToCamelCase<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T as BasicSnakeToCamelCase<K & string>]: SnakeToCamelCase<
        T[K]
      >;
    }
  : T;
