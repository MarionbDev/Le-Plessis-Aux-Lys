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
};

export type ReservationInput = {
  id: string;
  rental_type: "gite" | "chambre 1" | "chambre 2" | "chambre 3";
  start_date: string;
  end_date: string;
};

