import { createReducer, on } from "@ngrx/store";
import { ResourcesActions } from "./resources.actions";
import { createOwnedResource, createResource, OwnedResource } from "../resources.model";

const PLACEHOLDER_CPS = 0.7;

export const initialOwnedState: ReadonlyArray<OwnedResource> = [];

export const ResourcesReducer = createReducer(
  initialOwnedState,

  on(ResourcesActions.removeResource, (state, { resource }) => {
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

  on(ResourcesActions.addResource, (state, { resource }) => {
    let tmp = state.find(r => resource.id === r.resource.id);
    if (tmp !== undefined) {
    // This ID is already in the array, so filter the current resource then add the updated resource
      return [
        ...state.filter(r => resource.id !== r.resource.id), 
        createOwnedResource(
          createResource(
            tmp.resource.id,
            tmp.resource.amount + resource.amount),
          tmp.changePerSecond
      )];
      //   {
      //     resource: {
      //       id: tmp.resource.id, 
      //       amount: tmp.resource.amount + resource.amount
      //     }, 
      //     changePerSecond: tmp.changePerSecond
      // }];
    }
    // Ths ID is NOT in the array, so just append it
    return [
      ...state, 
      createOwnedResource(
        createResource(resource.id, resource.amount),
        PLACEHOLDER_CPS
    )];
    //   {
    //     resource: resource, 
    //     changePerSecond: PLACEHOLDER_CPS
    // }];
  }),

  on(ResourcesActions.tickOwnedResources, (state) => {
    let updatedResources: OwnedResource[] = [];
    state
    .filter( (resource) => 
      resource.resource.amount * resource.changePerSecond !== 0 )
    .forEach(resource => {
      updatedResources = [
        ...updatedResources,
        createOwnedResource(
          createResource(
            resource.resource.id,
            resource.resource.amount + resource.changePerSecond),
          resource.changePerSecond
        //  {
        //   resource: {
        //     id: resource.resource.id, 
        //     amount: resource.resource.amount + resource.changePerSecond
        //   }, changePerSecond: resource.changePerSecond
        // }
    )];});
    return [...updatedResources];
  }),

  on(ResourcesActions.initializeResources, (state, { resources }) => {
    return [...resources];
  })
);