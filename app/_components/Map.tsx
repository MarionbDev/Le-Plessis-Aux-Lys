"use client";

import { Variants, motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import gite from "../../public/gite/gite.jpg";
import icon from "../../public/icon-marker.svg";
import parc from "../../public/parc/parc1.jpg";

const position: [number, number] = [46.6281776, -0.09];

const imageVariants: Variants = {
  hide: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
    },
  },
};

const iconMarker = L.icon({
  iconUrl: icon.src,
  iconSize: [41, 41], // Taille de l'icône
  iconAnchor: [12, 41], // Point de l'icône correspondant à la position du marqueur
  popupAnchor: [1, -36], // Point où la popup devrait s'ouvrir par rapport à l'icône
});

export default function Map() {
  return (
    <div className="flex justify-center mt-32">
      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={imageVariants}
      >
        {" "}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-12 lg:mx-56 mt-12 text-justify  leading-relaxed">
            <span className="flex justify-center my-20 w-2/4 border-t-2 border-separator"></span>
            <MapContainer
              center={position}
              zoom={9}
              scrollWheelZoom={true}
              style={{
                height: "50vh",
                width: "50vw",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={iconMarker}>
                <Popup>
                  <p>
                    Le Plessis Aux Lys <br /> Gîte et Chambres d'Hôtes
                  </p>
                  <div className=" flex justify-center gap-2  contain-content">
                    <Image
                      src={parc}
                      alt="Photo du parc du gîte"
                      width={120}
                      height={200}
                    />
                    <Image
                      src={gite}
                      alt="Photo du parc du gîte"
                      width={120}
                      height={200}
                    />
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

