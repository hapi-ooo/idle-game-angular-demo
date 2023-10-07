import { createReducer, on } from "@ngrx/store";

import { ResourcesActions } from "./resources.actions";

export const initialState: ReadonlyArray<string> = [];

export const resourcesReducer = createReducer(
  initialState,
  on(ResourcesActions.retrievedResourceList, (_state, { resources }) => resources)
);