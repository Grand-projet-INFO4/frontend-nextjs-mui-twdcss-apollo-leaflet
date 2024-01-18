export type RawMongoDocument<TEntity> = Omit<TEntity, "id"> & { _id: string };
