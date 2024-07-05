import ListRentalsCalendar from "./_components/ListRentalsCalendar";

export default function Bookings() {
  return (
    <>
      <h2>Les réservations</h2>
      <div>
        {/* importer le composant Calendar réutilisable pour chaque location */}
      </div>
      <ListRentalsCalendar />
    </>
  );
}

