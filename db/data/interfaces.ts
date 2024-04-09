export interface ScreeningSeed {
  "date": string,
  "location": string,
  "cost": number,
  "is_pay_what_you_want": boolean,
  "tmdb_id"?: number,
  "title": string,
  "year"?: number,
  "poster_url"?: string,
  "backdrop_url"?: string,
  "logo_url"?: string,
  "description"?: string
}

export interface BookingSeed {
  screening_id: number,
  email: string,
  charge: number,
}

