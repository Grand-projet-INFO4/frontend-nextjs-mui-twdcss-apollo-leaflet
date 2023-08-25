// API resource timestamps fields
export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

// Omits timestamps fields from a resource's type
export type WithoutTimestamps<TEntity> = Omit<TEntity, keyof Timestamps>;

// Appends a timestamps to an entity type
// Overrides any existing timestamps fields
export type WithTimestamps<TEntity> = WithoutTimestamps<TEntity> & Timestamps;
