// Replaces the type of a field with a new one
export type ReplaceField<T, TField extends string, TNewType> = Omit<TField, T> & { [T]: TNewType };
