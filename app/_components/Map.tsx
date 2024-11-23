"use client";

import { Variants, motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

// const position: [number, number] = [46.6280278, -0.6603611];

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

const sectionVariants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.6,
    },
  },
};

// const iconMarker = L.icon({
//   iconUrl: icon.src,
//   iconSize: [41, 41], // Taille de l'icône
//   iconAnchor: [12, 41], // Point de l'icône correspondant à la position du marqueur
//   popupAnchor: [1, -36], // Point où la popup devrait s'ouvrir par rapport à l'icône
// });

export default function Map() {
  return (
    <div className="flex justify-center font-text text-text_color  ">
      <div className=" mb-40">
        <motion.section
          initial="hide"
          whileInView="show"
          exit="hide"
          variants={sectionVariants}
        >
          {" "}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center flex-col items-center text-md lg:text-md mx-6  mt-8 xl:mt-44  leading-loose">
              <div className=" flex flex-col lg:flex-row items-center justify-center mt-16 lg:mt-0 gap-4 my-8 lg:my-20">
                <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
                <p className="  font-semibold text-center lg:text-lg uppercase lg:w-[20rem] ">
                  nous trouver
                </p>
                <span className="flex justify-center w-[16rem] border-t-2  border-separator"></span>
                {/* <span className="flex justify-center my-16 xl:my-20 w-2/4 border-t-2 border-separator"></span> */}
              </div>

              <motion.section
                initial="hide"
                whileInView="show"
                exit="hide"
                variants={imageVariants}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className=""
                >
                  {/* <MapContainer
                    center={position}
                    zoom={12}
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
                          Le Plessis Aux Lys <br /> Gîtes et Chambres d'Hôtes
                        </p> */}
                  {/* <div className=" flex justify-center gap-2  contain-content">
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
                    </div> */}
                  {/* </Popup>
                    </Marker> */}
                  {/* </MapContainer> */}
                  <div className=" my-8  md:my-12 lg:my-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15498.99660188144!2d-0.67319274140706!3d46.62950023714675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4806e38cb2745943%3A0xacf713e592e80e95!2sLe%20Plessis%20aux%20Lys!5e0!3m2!1sfr!2sfr!4v1732388930331!5m2!1sfr!2sfr"
                      width="600"
                      height="450"
                      style={{
                        border: "0",
                      }}
                      className="w-[19rem] h-[12rem] sm:w-[30rem] sm:h-[22rem] md:w-[35rem] "
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </motion.div>
              </motion.section>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

