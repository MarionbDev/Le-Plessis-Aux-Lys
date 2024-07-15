import { Suspense } from "react";
import ToVisitInTheRegion from "../_components/ToVisitInRegion";

export default function Activites() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToVisitInTheRegion />
    </Suspense>
  );
}

