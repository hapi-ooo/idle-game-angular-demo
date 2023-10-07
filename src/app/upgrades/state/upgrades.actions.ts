import { createActionGroup, props } from "@ngrx/store";
import { Upgrades } from "../upgrades.model";

export const UpgradesActions = createActionGroup({
  source: 'Upgrades',
  events: {
    'Purchase Upgrde': props<{ upgrade: Upgrades }>(),
    'Sell Upgrade': props<{ upgrade: Upgrades }>(),
    'Initialize Upgrades': 
      props<{ upgrades: ReadonlyArray<Upgrades> }>(),
  }
});