const ERROR = {
  UNAVALAIBLE_SERVICE: "Ce service est indisponible",
  NO_BLOB_RESULT: "L'image n'a pas pu être envoyée vers le serveur",
  NO_BLOB_RESULTS: "Les images n'ont pas pu être envoyées vers le serveur",
  NO_BLOB_LIST: "Le serveur n'a pas pu envoyer la liste des images",
  NO_BLOB_DATA: "Une erreur est survenue : Impossible de générer les données du fichier image",
  NO_IMAGES_DATA: "Une erreur est survenue : Impossible de générer les données de l'image",
  NO_IMAGE_DATA: "L'image n'a pu être trouvée dans la base de données",
  PROPERTY_MISSING: "Une propriété du formulaire est manquante",
  DB_PUT_ERROR: "L'image n'a pas pu être enregistrée dans la base de données",
  DB_GET_ERROR: "Les données n'ont pas pu être récupérées sur cette base de données",
  DB_POST_ERROR: "Erreur dans l'envoi des données à la bdd",
  STATIC_GET_ERROR: "Une constante d'application n'a pas pu être trouvée"
};
const SUCCESS = {
  DELETE_FILE: "Le fichier a bien été effacé",
  DELETE_FILES: "Les fichiers ont bien été effacés",
  PUT: "Vos données ont bien été enregistrées.",
  PATCH: "Vos modifications ont bien été enregistrées.",
  IMAGE_DATA_PUT: "Les données de l'image ont bien été enregistrées.",
  IMAGE_DATA_DELETE: "Les données de l'image ont bien été supprimées.",
  IMAGE_UPLOAD: "Le fichier a bien été uploadé \n et les données de l'image enregistrées.",
  POST_BLOGDATA: "Les articles du blog ont bien été enregistrés.",
  POST_CONTENT: "Le nouveau contenu a bien été enregistré.",
  POST_USER: "Votre compte utilisateur a bien été créé.",
  UPDATE_USER: "Votre compte utilisateur a bien été modifié.",
  POST_RECOS: "Vos nouvelles recommandations ont bien été enregistrées.",
  DELETE_RECO: "La recommandation a bien été supprimée."
};
const WARNING = {
  NO_CACHED_DATA: "Warning: no cached data provided",
  NO_ALT_CACHED_DATA: "Warning: no alt cached data provided",
};

export const FETCH = {
  ERROR,
  SUCCESS,
  WARNING
};
