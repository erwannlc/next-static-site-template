import "server-only";
import { Recommendation } from "@/types/content-types";
import { ImageDataType } from "@/types/image-types";


function hashFromSecret(secret: string) {
  function TSH(s: string) {
    let h = 9;
    for (let i = 0; i < s.length;)
      h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
    return h ^ h >>> 9;
  };
  return TSH(secret);
};

function generateIdByIndex(arrayIndex: number | string, firstStringPart: string) {
  // model: `${firstStringPart}${arrayIndex+1}`
  function getId(index: number | string) {
    if (typeof index === "number") {
      return (index + 1).toString();
    } else if (typeof index === "string") {
      if (/^\d+$/.test(index)) {
        return (parseInt(index, 10) + 1).toString();
      } else {
        throw new Error("The string contains non-numeric characters. Index shoud be array index");
      }
    } else {
      throw new Error("Invalid index type. Index shoud be array index");
    }
  }
  return `${firstStringPart}${getId(arrayIndex)}`;
}

/** extracts numeric part at the end of the id string, and increments it */
function incrementId(lastId: string): string {
  // Other way : Extract the prefix (assuming it's everything before the "-" char)
  // const prefix = lastId.split("-")[0] + "-";
  // const numericPart = lastId.split("-")[1]; 

  const { numericPart, numericPartLength } = getIdNumericPart(lastId);
  // Convert the numeric part to a number, increment it, and convert it back to a string
  const incrementedNumericPart = (numericPart + 1).toString();
  // Pad the incremented numeric part with leading zeros to match the original length
  const paddedIncrementedNumericPart = incrementedNumericPart.padStart(numericPartLength, "0");
  // Replace the original numeric part in the lastId with the incremented and padded numeric part
  const newId = lastId.slice(0, -numericPartLength) + paddedIncrementedNumericPart;
  return newId;
}

function getIdNumericPart(id: string): {
  numericPart: number;
  numericPartLength: number;
} {
  // Find the numeric part using a regular expression
  const numericPartMatch = id.match(/\d+$/);
  if (!numericPartMatch) {
    throw new Error(
      "Cet id n'a pas de partie numérique en fin de chaîne de caractère."
    );
  }
  // Extract the numeric part from the match  
  const numericPartString = numericPartMatch[0];
  // Convert the numeric part to a number;
  const numericPart = parseInt(numericPartString, 10);
  // Determine the required length of the numeric part (leading zeros included)
  const numericPartLength = numericPartString.length;
  return { numericPart, numericPartLength };
}

function createUniqueId() {
  return crypto.randomUUID();
}


/**  model: "I-04" */
function createImageId(images: ImageDataType[]) {
  if (images.length === 0) return `I-01`;
  const lastId = images[images.length - 1].id;
  return incrementId(lastId);
}

/**  model: "I-00" */
function getInitialImageId(db_images: ImageDataType[]) {
  const numberOfImages = db_images.length;
  return numberOfImages === 0 ? `I-00` : db_images[numberOfImages - 1].id;
}

/**  model: "reco-04" */
function createRecommendationId(recos: Recommendation[]) {
  if (recos.length === 0) return `reco-01`;
  const lastId = recos[recos.length - 1].id;
  return incrementId(lastId);
}


/**  model: "Article04" */
function createNewArticleId(lastId?: string) {
  if (!lastId) return "Article01";
  return incrementId(lastId);
}

/**  model: "Article02-C4" */
function createNewCommentId(articleId: string, lastId?: string) {
  if (!lastId) return `${articleId}-C1`;
  return incrementId(lastId);
}

/**  model: "Article02-P4" */
function generateParagraphId({ parentContentId, lastId }: { parentContentId?: string, lastId?: string }) {
  if (!lastId && !parentContentId) throw new Error("please enter a parentContentId or a lastId");
  if (!lastId) return `${parentContentId}-P1`;
  return incrementId(lastId);
}


export {
  incrementId,
  createImageId,
  createUniqueId,
  getInitialImageId,
  createRecommendationId,
  createNewArticleId,
  createNewCommentId,
  generateParagraphId,
  generateIdByIndex,
  getIdNumericPart
};