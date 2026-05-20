export type ParserOptions = {
  history?: 'push' | 'replace';
  throttleMs?: number;
  clearOnDefault?: boolean;
};

export type Parser<T> = {
  parse: (value: string) => T | null;
  serialize?: (value: T) => string;
  defaultValue?: T;
  options?: ParserOptions;
  withDefault: (defaultValue: T) => Parser<T>;
  withOptions: (options: ParserOptions) => Parser<T>;
};

export function createParser<T>(base: { parse: (val: string) => T | null; serialize?: (val: T) => string }): Parser<T> {
  return {
    ...base,
    withDefault(defaultValue: T) {
      return { ...this, defaultValue };
    },
    withOptions(options: ParserOptions) {
      return { ...this, options: { ...this.options, ...options } };
    }
  };
}

export const parseAsString = createParser<string>({
  parse: (v) => v,
  serialize: String,
});

export const parseAsInteger = createParser<number>({
  parse: (v) => {
    const int = parseInt(v, 10);
    return isNaN(int) ? null : int;
  },
  serialize: String,
});

export const parseAsFloat = createParser<number>({
  parse: (v) => {
    const float = parseFloat(v);
    return isNaN(float) ? null : float;
  },
  serialize: String,
});

export const parseAsBoolean = createParser<boolean>({
  parse: (v) => v === 'true',
  serialize: String,
});

export const parseAsJson = <T>() => createParser<T>({
  parse: (v) => {
    try {
      return JSON.parse(v);
    } catch {
      return null;
    }
  },
  serialize: (v) => JSON.stringify(v),
});

export const parseAsArrayOf = <T>(itemParser: Parser<T>, separator = ',') => createParser<T[]>({
  parse: (v) => {
    if (!v) return [];
    return v.split(separator).map(itemParser.parse).filter((item): item is T => item !== null);
  },
  serialize: (v) => v.map((item) => (itemParser.serialize ? itemParser.serialize(item) : String(item))).join(separator),
});
