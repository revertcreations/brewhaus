import { BreweryAPI } from './datasources/breweryApi.js';

const api = new BreweryAPI();

export const resolvers = {
  Query: {
    breweries: async (
      _: unknown,
      args: {
        page?: number;
        perPage?: number;
        byCity?: string;
        byState?: string;
        byType?: string;
        byName?: string;
        sort?: string;
      },
    ) => {
      return api.getBreweries(args);
    },

    brewery: async (_: unknown, { id }: { id: string }) => {
      return api.getBreweryById(id);
    },

    searchBreweries: async (
      _: unknown,
      args: { query: string; page?: number; perPage?: number },
    ) => {
      return api.searchBreweries(args);
    },

    randomBreweries: async (_: unknown, { size }: { size?: number }) => {
      return api.getRandomBreweries(size);
    },
  },
};
