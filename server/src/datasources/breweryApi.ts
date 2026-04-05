const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

interface RawBrewery {
  id: string;
  name: string;
  brewery_type: string | null;
  street: string | null;
  address_1: string | null;
  city: string | null;
  state: string | null;
  state_province: string | null;
  postal_code: string | null;
  country: string | null;
  phone: string | null;
  website_url: string | null;
  latitude: string | null;
  longitude: string | null;
}

export interface Brewery {
  id: string;
  name: string;
  breweryType: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  websiteUrl: string | null;
  latitude: number | null;
  longitude: number | null;
}

function transformBrewery(raw: RawBrewery): Brewery {
  return {
    id: raw.id,
    name: raw.name,
    breweryType: raw.brewery_type,
    street: raw.street || raw.address_1,
    city: raw.city,
    state: raw.state || raw.state_province,
    postalCode: raw.postal_code,
    country: raw.country,
    phone: raw.phone,
    websiteUrl: raw.website_url,
    latitude: raw.latitude ? parseFloat(raw.latitude) : null,
    longitude: raw.longitude ? parseFloat(raw.longitude) : null,
  };
}

export class BreweryAPI {
  private async fetch<T>(url: string): Promise<T> {
    const res = await globalThis.fetch(url);
    if (!res.ok) {
      throw new Error(`Brewery API error: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  }

  private buildParams(
    args: Record<string, string | number | undefined>,
  ): string {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(args)) {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    }
    return params.toString();
  }

  async getBreweries(args: {
    page?: number;
    perPage?: number;
    byCity?: string;
    byState?: string;
    byType?: string;
    byName?: string;
    sort?: string;
  }) {
    const page = args.page || 1;
    const perPage = args.perPage || 30;

    const params = this.buildParams({
      page,
      per_page: perPage,
      by_city: args.byCity,
      by_state: args.byState,
      by_type: args.byType,
      by_name: args.byName,
      sort: args.sort,
    });

    const metaParams = this.buildParams({
      by_city: args.byCity,
      by_state: args.byState,
      by_type: args.byType,
      by_name: args.byName,
    });

    const [breweries, meta] = await Promise.all([
      this.fetch<RawBrewery[]>(`${BASE_URL}?${params}`),
      this.fetch<{ total: string }>(`${BASE_URL}/meta?${metaParams}`),
    ]);

    return {
      items: breweries.map(transformBrewery),
      total: parseInt(meta.total, 10),
      page,
      perPage,
    };
  }

  async getBreweryById(id: string) {
    const raw = await this.fetch<RawBrewery>(`${BASE_URL}/${id}`);
    return transformBrewery(raw);
  }

  async searchBreweries(args: {
    query: string;
    page?: number;
    perPage?: number;
  }) {
    const page = args.page || 1;
    const perPage = args.perPage || 30;

    const params = this.buildParams({
      query: args.query,
      page,
      per_page: perPage,
    });

    const [breweries, meta] = await Promise.all([
      this.fetch<RawBrewery[]>(`${BASE_URL}/search?${params}`),
      this.fetch<{ total: string }>(
        `${BASE_URL}/meta?by_name=${encodeURIComponent(args.query)}`,
      ),
    ]);

    return {
      items: breweries.map(transformBrewery),
      total: parseInt(meta.total, 10),
      page,
      perPage,
    };
  }

  async getRandomBreweries(size?: number) {
    const params = size ? `?size=${size}` : '';
    const breweries = await this.fetch<RawBrewery[]>(
      `${BASE_URL}/random${params}`,
    );
    return breweries.map(transformBrewery);
  }
}
