import { Upgrades } from "./upgrades.model";

export const UpgradesList: Upgrades[] = [
  {
    id: 'Bug Net',
    effects: [
      {
        id: 'Bugs',
        amount: 0,
        changePerSecond: 0.1,
      }
    ],
    numberOwned: 0,
    price: [
      {
        id: 'Bugs',
        amount: 40,
        changePerSecond: 0,
      },
      {
        id: 'Fruit',
        amount: 10,
        changePerSecond: 0,
      }
    ],
  },
  // {
  //   id:,
  //   effects:,
  //   numberOwned:,
  //   price:,
  // },
]