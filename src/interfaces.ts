export interface ScreeningSeed {
  date: string;
  location: string;
  cost: number;
  is_pay_what_you_want: boolean;
  tmdb_id?: number;
  title: string;
  year?: number;
  poster_url?: string;
  backdrop_url?: string;
  logo_url?: string;
  description?: string;
}

export interface BookingSeed {
  booking_id: string;
  screening_id: number;
  email: string;
  charge: number;
}

export interface ScreeningOverview {
  film: {
    title: string;
    year: number;
    poster_url: string;
  };
  screening_id: number;
  location: string;
  date: string;
  cost: number;
  is_pay_what_you_want: boolean;
}

export interface ScreeningDetail {
  film: {
    title: string;
    year: number;
    backdrop_url: string;
    logo_url: string;
    description: string;
  };
  location: string
  date: string;
  cost: number;
  is_pay_what_you_want: boolean;
}
