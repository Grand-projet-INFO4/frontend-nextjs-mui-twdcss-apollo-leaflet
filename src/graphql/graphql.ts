/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** Represents NULL values */
  Void: { input: any; output: any; }
};

export type BusStation = {
  __typename?: 'BusStation';
  city: EmbeddedCity;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  highways: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mainPhoto?: Maybe<Scalars['String']['output']>;
  mainPhotoId?: Maybe<Scalars['ID']['output']>;
  photos?: Maybe<Array<EmbeddedPhoto>>;
  position: GeoJsonPoint;
  slug: Scalars['String']['output'];
  stationName: Scalars['String']['output'];
  street: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type City = {
  __typename?: 'City';
  cityName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  region: Region;
  updatedAt: Scalars['DateTime']['output'];
};

export type Cooperative = {
  __typename?: 'Cooperative';
  address: Scalars['String']['output'];
  city: EmbeddedCity;
  coopName: Scalars['String']['output'];
  coverPhoto?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  highways: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  phones: Array<Scalars['String']['output']>;
  profilePhoto: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  socialMedias?: Maybe<Array<SocialMediaLink>>;
  transparentLogo?: Maybe<Scalars['String']['output']>;
  websiteURL?: Maybe<Scalars['String']['output']>;
  zone?: Maybe<CooperativeZone>;
};

export enum CooperativeZone {
  National = 'NATIONAL',
  Regional = 'REGIONAL'
}

export type Driver = {
  __typename?: 'Driver';
  cooperative?: Maybe<Cooperative>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  hiredAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  latestTripAt?: Maybe<Scalars['DateTime']['output']>;
  license: DriverLicense;
  phones: Array<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type DriverLicense = {
  __typename?: 'DriverLicense';
  categories: Array<Scalars['String']['output']>;
  licenseId: Scalars['String']['output'];
};

export type EmbeddedCity = {
  __typename?: 'EmbeddedCity';
  cityName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  region: Region;
};

export type EmbeddedPhoto = {
  __typename?: 'EmbeddedPhoto';
  description?: Maybe<Scalars['String']['output']>;
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type GeoJsonPoint = {
  __typename?: 'GeoJSONPoint';
  coordinates: Array<Scalars['Float']['output']>;
  type: GeoJsonType;
};

export enum GeoJsonType {
  Point = 'Point'
}

export type GetBusStationsQueryFilters = {
  cityId?: InputMaybe<Scalars['ID']['input']>;
  highways?: InputMaybe<Array<Scalars['String']['input']>>;
  nearPoint?: InputMaybe<Array<Scalars['Float']['input']>>;
  regionId?: InputMaybe<Scalars['ID']['input']>;
};

export type GetCitiesQueryFilters = {
  regionId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type GetDriversQueryFilters = {
  cooperativeId?: InputMaybe<Scalars['String']['input']>;
  licenseCategories?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetRegionsQueryFilters = {
  province?: InputMaybe<Scalars['String']['input']>;
};

export type Highway = {
  __typename?: 'Highway';
  cities: Array<EmbeddedCity>;
  createdAt: Scalars['DateTime']['output'];
  distance?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  no: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PagePaginatedCities = {
  __typename?: 'PagePaginatedCities';
  count: Scalars['Int']['output'];
  items: Array<City>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
};

export type PaginatedBusStations = {
  __typename?: 'PaginatedBusStations';
  count: Scalars['Int']['output'];
  items: Array<BusStation>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
};

export type PaginatedDrivers = {
  __typename?: 'PaginatedDrivers';
  count: Scalars['Int']['output'];
  items: Array<Driver>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  busStations: PaginatedBusStations;
  cities: PagePaginatedCities;
  cooperative: Cooperative;
  driver: Driver;
  drivers: PaginatedDrivers;
  highway: Highway;
  highways: Array<Highway>;
  regions: Array<Region>;
  users: Array<User>;
};


export type QueryBusStationsArgs = {
  filters?: InputMaybe<GetBusStationsQueryFilters>;
  pagination: QueryPagePaginationParams;
  textSearch?: InputMaybe<QueryTextSearchParams>;
};


export type QueryCitiesArgs = {
  filters?: InputMaybe<GetCitiesQueryFilters>;
  pagination: QueryPagePaginationParams;
  sort?: InputMaybe<QuerySortParams>;
  textSearch?: InputMaybe<QueryTextSearchParams>;
};


export type QueryCooperativeArgs = {
  identifier: Scalars['ID']['input'];
};


export type QueryDriverArgs = {
  identifier: Scalars['ID']['input'];
};


export type QueryDriversArgs = {
  filters?: InputMaybe<GetDriversQueryFilters>;
  pagination: QueryPagePaginationParams;
  sort?: InputMaybe<QuerySortParams>;
  textSearch?: InputMaybe<QueryTextSearchParams>;
};


export type QueryHighwayArgs = {
  identifier?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryHighwaysArgs = {
  sort?: InputMaybe<QuerySortParams>;
  textSearch?: InputMaybe<QueryTextSearchParams>;
};


export type QueryRegionsArgs = {
  filters?: InputMaybe<GetRegionsQueryFilters>;
  sort?: InputMaybe<QuerySortParams>;
};

export type QueryPagePaginationParams = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export enum QuerySortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type QuerySortParams = {
  order: QuerySortOrder;
  sortBy: Scalars['String']['input'];
};

export type QueryTextSearchParams = {
  search?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type Region = {
  __typename?: 'Region';
  id: Scalars['ID']['output'];
  province: Scalars['String']['output'];
  regionName: Scalars['String']['output'];
};

export type SocialMediaLink = {
  __typename?: 'SocialMediaLink';
  platoform: SocialMediaPlatform;
  url: Scalars['String']['output'];
};

export enum SocialMediaPlatform {
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Tiktok = 'TIKTOK',
  Twitter = 'TWITTER'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};
