import { createFeatureSelector } from "@ngrx/store";
import { Resource } from "../resources.model";

export const selectResources = 
  createFeatureSelector<ReadonlyArray<Resource>>('Resources');

export const selectResource =
  createFeatureSelector<ReadonlyArray<string>>('resources');