import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Resource } from '../resources.model';

export const OwnedResourcesActions = createActionGroup({
  source: 'OwnedResources',
  events: {
    'Add Resource': props<{ resource: Resource }>(),
    'Remove Resource': props<{ resource: Resource }>(),
    'Tick Owned Resources': emptyProps(),
  },
});

export const ResourcesActions = createActionGroup({
  source: 'Resources',
  events: {
    'Retrieved Resource List': props<{ resources: ReadonlyArray<string>}>(),
  },
});