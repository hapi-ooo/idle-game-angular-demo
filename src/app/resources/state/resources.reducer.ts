import { createReducer, on } from "@ngrx/store";
import { ResourcesActions } from "./resources.actions";
import { Resource } from "../resources.model";

const PLACEHOLDER_CPS = 0.7;

export const initialOwnedState: ReadonlyArray<Resource> = [];

export const ResourcesReducer = createReducer(
  initialOwnedState,

  on(ResourcesActions.removeResource, (state, { resource }) => {

    // Set target then branch based on value
    let target = state.find(r => resource.id === r.id);
    return target === undefined ?

    // Return the original state if the ID cannot be found
    [...state]

    // Filter the current resource then minus the updated resource
    : [
      ...state.filter(r => resource.id !== r.id), 
      {
        id: target.id, 
        amount: target.amount - resource.amount, 
        changePerSecond: target.changePerSecond
    }]
  }),

  on(ResourcesActions.addResource, (state, { resource }) => {

    // Set the target and branch based on its value
    let target = state.find(r => resource.id === r.id);
    return target === undefined ?

    // Ths ID is NOT in the array, so just append it
    [
      ...state, 
      {
        id: resource.id,
        amount: resource.amount,
        changePerSecond: resource.changePerSecond,
    }]

    // This ID is already in the array. Filter the current resource
    // then add the updated resource.
    : [
      ...state.filter(r => resource.id !== r.id), 
      {
        id: target.id,
        amount: target.amount + resource.amount,
        changePerSecond: target.changePerSecond
    }];
  }),

  on(ResourcesActions.tickOwnedResources, (state) => {
    // Initialize the array to write the updates to
    let updatedResources: Resource[] = [];

    state

    // Select all resources that change on ticks
    .filter( resource => resource.changePerSecond !== 0 )

    // Add the `changePerSecond` to `amount` for each 
    // resource selected by the filter
    .forEach(resource => 
      updatedResources = [
        ...updatedResources,
        {
          id: resource.id,
          amount: resource.amount + resource.changePerSecond,
          changePerSecond: resource.changePerSecond
    }]);

    // Return the spread update array
    return [
      ...updatedResources,
      ...state.filter( resource => resource.changePerSecond === 0 )
    ];
  }),

  on(ResourcesActions.initializeResources, (_state, { resources }) => {
    // Set the state to whatever resources are passed
    return [...resources];
  })
);