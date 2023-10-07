import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Resource } from '../resources.model';

export const ResourcesActions = createActionGroup({
  source: 'Resources',
  events: {
    'Add Resource': props<{ resource: Resource }>(),
    'Remove Resource': props<{ resource: Resource }>(),
    'Tick Owned Resources': emptyProps(),
    'Initialize Resources': 
      props<{ resources: ReadonlyArray<Resource> }>(),
  },
});