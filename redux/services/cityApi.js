import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/geoJSONs/' }),
  endpoints: builder => ({
    getRoads: builder.query({
      query: cityName => `roads/${cityName}.geojson`
    }),
    getBorders: builder.query({
      query: cityName => `borders/${cityName}.geojson`
    }),
    getHexes: builder.query({
      query: cityName => `hexes/${cityName}.geojson`
    }),
    getBuildings: builder.query({
      query: cityName => `buildings/${cityName}.geojson`
    })
  })
});

export const isochronApi = createApi({
  reducerPath: 'isochronApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://graphhopper.com/api/1/`
  }),
  endpoints: builder => ({
    getIsochrons: builder.query({
      query: (clickCoordinates, transport) => `isochrone?point=${clickCoordinates[1]},${clickCoordinates[0]}&profile=${transport}&time_limit=900&buckets=3&key=550ee6f2-15b2-4b89-b21e-66304e205b7a`
    })
  })
});

export const {
  useGetIsochronsQuery
} = isochronApi

export const {
  useGetRoadsQuery,
  useGetBordersQuery,
  useGetHexesQuery,
  useGetBuildingsQuery
} = cityApi;
