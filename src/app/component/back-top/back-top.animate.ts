import { animate, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';

export const fadeMotion: AnimationTriggerMetadata = trigger('fadeMotion', [
  transition(':enter', [style({ opacity: 0 }), animate(`0.2s`, style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate(`0.2s`, style({ opacity: 0 }))])
]);
