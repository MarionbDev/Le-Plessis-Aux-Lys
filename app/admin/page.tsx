export default function DashboardAdmin() {
  return (
    <div className="flex flex-col  py-20 mx-10 gap-y-20 gap-x-36  w-[90rem]">
      {/* <div className="flex flex-wrap gap-20 mx-10">
        <Card className=" w-[30rem] h-96 p-8">
          <p className="text-center">Réservations du mois en-cours</p>
          <CardContent className="flex">
            <div>Gîte</div>
            <div>Chambre 1</div>
            <div>Chambre 2</div>
            <div>Chambre 3</div>
          </CardContent>
        </Card>
        <Card className="w-96 p-8">
          <p className="text-center">Réservations du mois à venir </p>
        </Card>
      </div> */}
      {/* <div className="flex  flex-wrap gap-20 mx-10">
        <TotalReservations title="Gîte" />
        <TotalReservations title="Chambre1" />
        <TotalReservations title="Chambre2" />
        <TotalReservations title="Chambre3" />
      </div>
      <div className="flex flex-wrap gap-20  ">
        <div className=" shadow-div rounded-md ">
          <Card className="flex flex-col w-96 h-full  p-8  text-text_color border-2 border-yellow/50">
            <p>Total réservations depuis le lancement du site</p>
            <div className="flex flex-col items-center justify-center mt-10">
              <p className=" text-[5rem] font-bold ">358</p>
              <p>Jours de réservations</p>
            </div>
          </Card>
        </div>

        <EvolutionByYearInProgress />
        <EvolutionByYears />
      </div> */}
    </div>
  );
}

