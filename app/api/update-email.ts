// import { updateEmail } from "@/services/auth.services";
// import { NextApiRequest, NextApiResponse } from "next";

// type RequestBody = {
//   newEmail: string;
//   email: string;
//   password: string;
// };

// // Fonction pour déclencher un déploiement sur Vercel via le webhook
// const triggerVercelDeploy = async () => {
//   const deployHookUrl =
//     "https://api.vercel.com/v1/integrations/deploy/prj_FF50GcTZd9iVIGcTatO0eNL9mOAW/VL0dwMcdXM"; // Remplacez par votre URL du webhook

//   console.log("Déclenchement du déploiement Vercel...");

//   try {
//     console.log("Déclenchement du déploiement Vercel...");

//     const response = await fetch(deployHookUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`, // Remplacez par votre token Vercel si nécessaire
//       },
//       body: JSON.stringify({
//         event: "update-email", // L'événement que vous voulez suivre
//         payload: {
//           // Optionnel : vous pouvez passer des informations supplémentaires si nécessaire
//           message: "Email mis à jour",
//         },
//       }),
//     });

//     console.log("Réponse du webhook Vercel:", response);

//     if (!response.ok) {
//       throw new Error("Erreur lors du déclenchement du déploiement");
//     }

//     console.log("Déploiement Vercel déclenché avec succès");
//   } catch (error) {
//     console.error("Erreur dans le déclenchement du déploiement Vercel:", error);
//   }
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   console.log("Requête reçue dans handler", req.method);

//   if (req.method === "POST") {
//     const { newEmail, email, password }: RequestBody = req.body;

//     try {
//       // Appeler la fonction pour mettre à jour l'email
//       const updateData = await updateEmail(newEmail, { email, password });

//       // Si l'email est mis à jour avec succès, déclenche un déploiement sur Vercel
//       await triggerVercelDeploy();

//       res.status(200).json({
//         message: "Email mis à jour avec succès.",
//         updateData,
//       });
//     } catch (error) {
//       // Vérification et gestion des erreurs
//       if (error instanceof Error) {
//         console.error("Erreur lors de la mise à jour de l'email:", error);
//         res.status(500).json({ error: error.message });
//       } else {
//         console.error("Erreur inconnue:", error);
//         res.status(500).json({
//           error: "Erreur inconnue lors de la mise à jour de l'email.",
//         });
//       }
//     }
//   } else {
//     res.status(405).json({ message: "Méthode non autorisée" });
//   }
// }

