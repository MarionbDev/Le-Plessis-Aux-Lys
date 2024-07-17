import { Loader } from "lucide-react";
import { Suspense } from "react";
import ToVisitInTheRegion from "../_components/ToVisitInRegion";

export default function Activites() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader size={50} className=" animate-spin " />
        </div>
      }
    >
      <ToVisitInTheRegion />
    </Suspense>
  );
}

