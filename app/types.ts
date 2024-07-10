export type RentalCalendar = {
  id: string;
  name: string;
  type: "gite" | "chambre 1" | "chambre 2" | "chambre 3";
};

export type Reservation = {
  id: string;

  start_date: string;
  end_date: string;
  rentals: RentalCalendar;
};

export type CalendarEvent = {
  id?: string;
  rental_type: "gite" | "chambre 1" | "chambre 2" | "chambre 3";
  start_date: string;
  end_date: string;
  type: "indisponible" | "reserve";
};

export type ReservationInput = {
  id: string;
  rental_type: "gite" | "chambre 1" | "chambre 2" | "chambre 3";
  start_date: string;
  end_date: string;
  type: "indisponible" | "reserve";
};

export type UpdatedRates = {
  lowSeasonRateNight: number | null | undefined;
  highSeasonRateNight: number | null | undefined;
  lowSeasonRateWeek: number | null | undefined;
  highSeasonRateWeek: number | null | undefined;
};

export type onUploadComplete = {
  orientation: "horizontal" | "vertical";
  id: string;
  path: string;
  fullPath: string;
};

export type UploadFileAdminProps = {
  onUploadComplete: (uploadedFileData: onUploadComplete) => void;
};

export type uploadedFileData = {
  orientation: "horizontal" | "vertical";
  id: string;
  path: string;
  fullPath: string;
};

