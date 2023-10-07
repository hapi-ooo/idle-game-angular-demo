export interface Resource {
  id: string;
  amount: number;
}

export interface OwnedResource {
  resource: Resource;
  changePerSecond: number;
}

export const createResource =
  (id: string, amount: number) => {
  return ({id: id, amount: amount});
}

export const createOwnedResource =
  (resource: Resource, changePerSecond: number) => {
  return { 
    resource: {
      id: resource.id,
      amount: resource.amount,
    },
    changePerSecond: changePerSecond
  };
}