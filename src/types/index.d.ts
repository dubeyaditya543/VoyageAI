type User = {
  name: string,
  email: string,
  password: string
}

type LoginData = {
  email: string,
  password: string
}

type SignupData = LoginData & {
  name: string
}

type SignupFormValues = {
  name: string,
  email: string,
  password: string
}

type LoginFormValues = Omit<SignupFormValues, "name">

type City = {
  name: string,
  country: string,
  latitude: number,
  longitude: number
}

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
  }

type PackingItem = {
  name: string;
  quantity: string;
  reason?: string;
  importance?: "High" | "Medium" | "Low";
  packed?: boolean
};

type PackingCategory = {
  category: string;
  items: PackingItem[];
};

type PackingResponse = {
  trip_summary: string;
  packing_categories: PackingCategory[];
};