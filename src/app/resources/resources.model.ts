export interface Resource {
  id: string;
  amount: number;
}

export interface OwnedResource {
  resource: Resource;
  changePerSecond: number;
}