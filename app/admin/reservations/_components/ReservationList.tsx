import { ReservationListProps } from "@/app/types";
import { Trash2 } from "lucide-react";

const ReservationList: React.FC<ReservationListProps> = ({
  searchTerm,
  setSearchTerm,
  filteredDates,
  handleDelete,
}) => {
  return (
    <div className="flex flex-col min-w-80 items-center h-[12rem] md:h-[28rem]  md:mt-5">
      <p className="md:mb-6 invisible md:visible ">Réservations</p>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher par date"
        className="mb-4 p-2 border border-gray-300 rounded italic text-sm w-48"
      />
      {filteredDates.length > 0 && searchTerm && (
        <ul className=" overflow-auto h-[12rem]  md:h-[25rem] py-2    ">
          {filteredDates.map((reservation) => (
            <li
              key={reservation.id}
              className="mb-2 text-sm flex justify-between items-center gap-2 h-6 px-5"
            >
              <p>
                Du {new Date(reservation.start_date).toLocaleDateString()} au{" "}
                {new Date(reservation.end_date).toLocaleDateString()}
              </p>
              <div className=" ">
                <button
                  onClick={() => handleDelete(reservation.id)}
                  className=" text-text_color hover:underline rounded-full p-2 hover:duration-300   hover:text-red-600  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {filteredDates.length === 0 && searchTerm && (
        <p className="italic text-sm w-48">
          Aucune réservation trouvée pour cette recherche.
        </p>
      )}
    </div>
  );
};

export default ReservationList;

