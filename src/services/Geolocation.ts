import { createContext } from 'react';

export interface MapState {
  latitude: number;
  longitude: number;
  zoom: number;
  setMapState?: () => any;
}

export const DEFAULT_MAP_STATE: MapState = {
  latitude: 43.6529,
  longitude: -79.3849,
  zoom: 12,
  setMapState: undefined,
};

export const mapStateReducer = (oldState: MapState, newState: object) => {
  return { ...oldState, ...newState };
};

export const GeolocationContext = createContext(DEFAULT_MAP_STATE);

export enum GeolocationPermissionStates {
  granted='granted',
  prompt='prompt',
  denied='denied',
  dismissed='dismissed',
};

interface GeolocationHooks {
  onPermissionNeeded: () => any;
  onPermissionDenied: () => any;
  onSuccess: (position: Position) => any;
  onError?: (error: any) => any; // probably just default to denied
}

export default async (hooks: GeolocationHooks): Promise<void> => {
  // Permission check
  const status = await navigator.permissions.query({name: "geolocation"});
  if (status.state === GeolocationPermissionStates.denied) return hooks.onPermissionDenied();
  if (status.state === GeolocationPermissionStates.prompt) hooks.onPermissionNeeded();

  // default: granted
  navigator.geolocation.getCurrentPosition((position: Position) => {
    hooks.onSuccess(position);
  }, error => {
    // has a status that we can use but for now just assume denied
    hooks.onPermissionDenied();
  });
}