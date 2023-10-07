import { createFeatureSelector } from "@ngrx/store";
import { OwnedResource } from "../resources.model";

export const selectOwnedResources = 
  createFeatureSelector<ReadonlyArray<OwnedResource>>('ownedResources');

export const selectResource =
  createFeatureSelector<ReadonlyArray<string>>('resources');