export interface ICRUDModelReaders<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}

export type ICRUDModel<T> = ICRUDModelReaders<T>;
