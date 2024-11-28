export type RentalCalendar = {
  id: string;
  name: string;
  type:
    | "petiteOurse"
    | "grandeOurse"
    | "orion"
    | "cassiopee"
    | "andromede"
    | "pegase";
};

export type CustomDateRange = {
  from: Date;
  to: Date;
  rentalType: RentalType;
  type: "indisponible" | "reserve";
};

export type RentalType =
  | "petiteOurse"
  | "grandeOurse"
  | "orion"
  | "cassiopee"
  | "andromede"
  | "pegase";

export type Reservation = {
  id: string;
  start_date: string;
  end_date: string;
  rentals: RentalCalendar;
};

export type CalendarEvent = {
  id?: string;
  rental_type:
    | "petiteOurse"
    | "grandeOurse"
    | "orion"
    | "cassiopee"
    | "andromede"
    | "pegase";
  start_date: string;
  end_date: string;
  type: "indisponible" | "reserve";
};

export type ReservationInput = {
  id: string;
  rental_type:
    | "petiteOurse"
    | "grandeOurse"
    | "orion"
    | "cassiopee"
    | "andromede"
    | "pegase";
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

export type UpdateRentalDetails = {
  title_rental: string;
  capacity_rental: string;
  description_rental: string;
};

export type onUploadComplete = {
  orientation: "horizontal" | "vertical";
  id: string;
  fullPath: string;
  image_path: string;
};

export type UploadFileAdminProps = {
  onUploadComplete?: (uploadedFileData: onUploadComplete) => void;
};

export type uploadedFileData = {
  orientation: "horizontal" | "vertical";
  id: string;
  image_path: string;
  fullPath: string;
};

export type ReservationListProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredDates: ReservationInput[];
  handleDelete: (id: string) => void;
};

export type ArticleProps = {
  id: string;
  title: string;
  description: string;
  content: string;
  url_link: string;
  image_path: string;
  onUploadComplete?: (uploadedFileData: onUploadComplete) => void;
  handleDelete?: (id: string) => void;
  handleUpdate?: () => void;
};

export type Slide = {
  image_path: string;
  title: string;
};

export type ImageType = {
  path: string;
  orientation: "horizontal" | "vertical";
  fileName: string;
};

// export type RentalsDetailsProps = {
//   id: string;
//   title: string;
//   capacity: string;
//   description: string;
//   handleUpdate?: (id: string) => void;
// };

export type ListRentalsDetailsProps = {
  id: string;
  type: string;
  title_rental: string;
  capacity_rental: string;
  description_rental: string;
  handleUpdate?: (id: string) => void;
};

