import { MONTHS_FR } from "@/constants/UI/global_messages";

/** ------------ time ------------------- */
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateDelay(start: number, end: number, origin?: string) {
  const difference = end - start;
  const seconds = Math.floor(difference / 1000); // Convert milliseconds to seconds
  const milliseconds = difference % 1000; // Remaining milliseconds
  // // Other way, returning object :
  // return { seconds, milliseconds };
  const result = `${seconds} seconds ${milliseconds} milliseconds`;
  return origin ? `Delay ${`for ${origin}`}: ${result}` : `Delay : ${result}`;
}

/** ------------ Date ------------------- */
function getCurrentDate() {
  const date = new Date();
  return date.toISOString();
}
const oneMinute = 60 * 1000;
const oneHour = 60 * oneMinute;
const addMinutes = (n: number) => n * oneMinute;
const addHours = (n: number) => n * oneHour;
const addDays = (n: number) => n * 24 * oneHour;

function getParsedDate(dateString: string): string {
  // const parsedDate = dateString.split("T")[0];
  const date = new Date(dateString);
  const month = MONTHS_FR[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  return `${day} ${month} ${year}`;
}


/** ------------ arrays ------------------- */
function sliceArrayIntoParts(arr: any[], numParts: number) {
  if (!Array.isArray(arr) || numParts <= 0) return [];
  const partSize = Math.ceil(arr.length / numParts);
  const result = [];
  for (let i = 0; i < arr.length; i += partSize) {
    result.push(arr.slice(i, i + partSize));
  }
  return result;
}

function arraysAreEqual<T>(arr1: T[], arr2: T[]): boolean {
  function isObject(object: any) {
    return object != null && typeof object === "object";
  }
  function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (!isObject(obj1) || !isObject(obj2)) return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
  }
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) return false;
  // Check each object in arr1 against every object in arr2
  for (const obj1 of arr1) {
    if (!arr2.some(obj2 => deepEqual(obj1, obj2))) return false;
  }
  return true;
}

/** ------------ objects ------------------- */
function removeDuplicateObjectsById<T extends { id: string }>(objects: T[]): T[] {
  const uniqueIds = new Set<string>();
  return objects.filter((obj) => {
    const isUnique = !uniqueIds.has(obj.id); // Check if ID is not already in the set
    if (isUnique) {
      uniqueIds.add(obj.id); // Add the ID to the set for future checks
    }
    return isUnique;
  });
}
function logDuplicateObjectsById<T extends { id: string }>(objects: T[]): {
  id: string;
  count: number
}[] {
  const idCounts: { [key: string]: number } = {};
  for (const obj of objects) {
    const id = obj.id;
    if (idCounts[id]) {
      idCounts[id]++;
    } else {
      idCounts[id] = 1;
    }
  }
  // Filter and return objects with counts greater than 1 (duplicates)
  return Object.entries(idCounts)
    .filter(([id, count]) => count > 1)
    .map(([id, count]) => ({ id, count }));
}

/** delete given string in any values of an object containing only array of strings values */
function deleteStringFromObject<T extends { [key: string]: string[] }>(
  originalObject: T,
  stringToDelete: string
): T {
  // Use an intermediate object with a compatible index signature
  const newObj: { [K in keyof T]: string[] } = {} as T;

  Object.entries(originalObject).forEach(([key, val]) => {
    newObj[key as keyof T] = val.filter(item => item !== stringToDelete);
  });

  return newObj as T;
}

/** returns an array containing keys of an object obj, 
 * if obj[key] value includes id (string) passed in arg
 * */
function getKeysWithId<T extends { [key: string]: string[] }>(
  obj: T,
  id: string
): Array<keyof T> {
  const keys: Array<keyof T> = [];

  Object.entries(obj).forEach(([key, val]) => {
    if (val.includes(id)) {
      keys.push(key as keyof T);
    }
  });

  return keys;
}

/** ------------ string ------------------- */
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** extracts numeric part at the end of a string, and increments it */
function incrementNumericPart(lastItem: string): string {
  // Other way : Extract the prefix (assuming it's everything before the "-" char)
  // const prefix = lastItem.split("-")[0] + "-";
  // const numericPart = lastItem.split("-")[1]; 

  const { numericPart, numericPartLength } = getNumericPart(lastItem);
  // Convert the numeric part to a number, increment it, and convert it back to a string
  const incrementedNumericPart = (numericPart + 1).toString();
  // Pad the incremented numeric part with leading zeros to match the original length
  const paddedIncrementedNumericPart = incrementedNumericPart.padStart(numericPartLength, "0");
  // Replace the original numeric part in the lastItem with the incremented and padded numeric part
  const newItem = lastItem.slice(0, -numericPartLength) + paddedIncrementedNumericPart;
  return newItem;
}

function getNumericPart(item: string): {
  numericPart: number;
  numericPartLength: number;
} {
  // Find the numeric part using a regular expression
  const numericPartMatch = item.match(/\d+$/);
  if (!numericPartMatch) {
    throw new Error(
      "Cet item n'a pas de partie numérique en fin de chaîne de caractère."
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

/** ------------ number ------------------- */
function isNumberInRange(n: number, min: number, max: number) {
  return n >= min && n <= max;
}
function isIntegerInRange(n: number, min: number, max: number) {
  return Number.isInteger(n) && n >= min && n <= max;
}

/** ------------ others ------------------- */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

/** ------------ classNames ------------------- */
function mergeCn(...classNames: string[]) {
  return classNames.join(` `);
}
function conditionnalCn(condition: boolean, className: string, condClassName: string) {
  return condition
    ? mergeCn(className, condClassName)
    : `${className}`;
}




export {
  wait,
  sliceArrayIntoParts,
  getErrorMessage,
  getCurrentDate,
  addMinutes,
  addHours,
  addDays,
  getParsedDate,
  arraysAreEqual,
  calculateDelay,
  removeDuplicateObjectsById,
  logDuplicateObjectsById,
  capitalize,
  isNumberInRange,
  isIntegerInRange,
  mergeCn,
  conditionnalCn,
  deleteStringFromObject,
  getKeysWithId,
  getNumericPart,
  incrementNumericPart
};