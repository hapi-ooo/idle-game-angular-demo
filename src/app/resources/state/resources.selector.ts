import { createFeatureSelector } from "@ngrx/store";
import { OwnedResource } from "../resources.model";

export const selectResources = 
  createFeatureSelector<ReadonlyArray<OwnedResource>>('Resources');

export const selectResource =
  createFeatureSelector<ReadonlyArray<string>>('resources');