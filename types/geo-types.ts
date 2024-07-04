export type TGeoContextType = {
  deviceGeoPosition: {
    latitude: number;
    longitude: number;
    city: string;
    region: string;
    country: string;
  } | null;
  setDeviceGeoPosition: (newGeo: {
    latitude: number;
    longitude: number;
    city: string;
    region: string;
    country: string;
  }) => void;
  getLocation: () => Promise<void>;
};

export type TCity = {
  name: string;
  latitude: number;
  longitude: number;
  admin1: string;
  country: string;
  isoCountryCode: string;
};
