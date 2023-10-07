import { createReducer, on } from "@ngrx/store";
import { OwnedResourcesActions } from "./resources.actions";
import { OwnedResource } from "../resources.model";

const PLACEHOLDER_CPS = 0.7;

export const initialOwnedState: ReadonlyArray<OwnedResource> = [];

export const ownedResourcesReducer = createReducer(
  initialOwnedState,

  on(OwnedResourcesActions.removeResource, (state, { resource }) => {
    let tmp = state.find(r => resource.id === r.resource.id);
    if (tmp !== undefined) {
    // This ID is already in the array, so filter the current resource then minus the updated resource
      return [
        ...state.filter(r => resource.id !== r.resource.id), 
        {
          resource: {
            id: tmp.resource.id, 
            amount: tmp.resource.amount - resource.amount
          }, 
          changePerSecond: tmp.changePerSecond
      }];
    }
    // A mistake must have happened, do not update the state
    return state;
  }),

  on(OwnedResourcesActions.addResource, (state, { resource }) => {
    let tmp = state.find(r => resource.id === r.resource.id);
    if (tmp !== undefined) {
    // This ID is already in the array, so filter the current resource then add the updated resource
      return [
        ...state.filter(r => resource.id !== r.resource.id), 
        {
          resource: {
            id: tmp.resource.id, 
            amount: tmp.resource.amount + resource.amount
          }, 
          changePerSecond: tmp.changePerSecond
      }];
    }
    // Ths ID is NOT in the array, so just append it
    return [
      ...state, {
        resource: resource, 
        changePerSecond: PLACEHOLDER_CPS
    }];
  }),

  on(OwnedResourcesActions.tickOwnedResources, (state) => {
    let updatedOwnedResources: OwnedResource[] = [];
    state.forEach(resource => {
      updatedOwnedResources = [
        ...updatedOwnedResources, {
          resource: {
            id: resource.resource.id, 
            amount: resource.resource.amount + resource.changePerSecond
          }, changePerSecond: resource.changePerSecond
        }];
    });
    return updatedOwnedResources;
  })
);