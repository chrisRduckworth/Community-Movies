export interface Screening {
  "date": number,
  "location": string,
  "cost": number,
  "isPayWhatYouWant": boolean,
  "tmdb_id": number,
  "title": string,
  "year": number,
  "poster_url": string,
  "backdrop_url": string,
  "logo_url": string,
  "description": string
}

export interface Booking {
  screening_id: number,
  email: string,
  charge: number,
}

