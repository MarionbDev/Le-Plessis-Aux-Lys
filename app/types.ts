export type RentalCalendar = {
  id: string;
  name: string;
  type: "gîte" | "chambre 1" | "chambre 2" | "chambre 3";
};

export type Reservation = {
  id: string;
  rental_id: string;
  start_date: string;
  end_date: string;
  rentals: RentalCalendar;
};

export type CalendarEvent = {
  rental_type: "gîte" | "chambre 1" | "chambre 2" | "chambre 3";
  start_date: string;
  end_date: string;
};

