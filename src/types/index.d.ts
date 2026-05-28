import type { Id } from "../../convex/_generated/dataModel";

type User = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type SignupData = LoginData & {
  name: string;
};

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};

type LoginFormValues = Omit<SignupFormValues, "name">;

type City = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

type CitiesFetched = [
  {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    admin3_id: number;
    admin4_id: number;
    timezone: string;
    population: number;
    postcodes: [number, number];
    country_id: number;
    country: string;
    admin1: string;
    admin3: string;
    admin4: string;
  },
];

type CityFetch = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: [number, number];
  country_id: number;
  country: string;
  admin1: string;
  admin3: string;
  admin4: string;
};

type PackingItem = {
  _id?: Id<"packingItems">;
  userId?: Id<"users">;
  itemName: string;
  category: "clothing" | "electronics" | "toiletries" | "miscellaneous";
  reason?: string;
  quantity: number;
  packed: boolean
};
