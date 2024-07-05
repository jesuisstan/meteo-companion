export type TGeoPosition = {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
  isoCountryCode: string;
};

export type TGeoContextType = {
  geoPosition: TGeoPosition | null;
  setGeoPosition: (newGeo: {
    latitude: number;
    longitude: number;
    city: string;
    region: string;
    country: string;
    isoCountryCode: string;
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
