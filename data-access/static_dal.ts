import "server-only";
import type { LocalJSONFilename, StaticImagesDataJsonFilename } from "@/types/app-types";
import type { ImageDataType } from "@/types/image-types";
import { promises as fs } from "fs";

const dataJsonPath = "/data-access/static/json/";
const imagesDataJsonPath = "/data-access/static/json/imagesData/";

export async function getStaticImagesDataByPage_dal(
  imagesFileName: StaticImagesDataJsonFilename
): Promise<ImageDataType[]> {
  const imagesPath = imagesDataJsonPath + imagesFileName;
  const imagesJson = await fs.readFile(process.cwd() + imagesPath, "utf8");
  const staticImagesData = JSON.parse(imagesJson) as ImageDataType[];
  return staticImagesData;
}

export async function getStaticImagesDataMultipleSources_dal(
  imagesFileNames: StaticImagesDataJsonFilename[]
): Promise<ImageDataType[]> {
  const staticImagesData = (await Promise.all(
    imagesFileNames.map(async (imagesFileName) =>
      await getStaticImagesDataByPage_dal(
        imagesFileName
      )
    ))).flat();
  return staticImagesData;
}

/** 
 * Dev only //
 * Fetch mocked data from local json files.
 * Type T : ImageDataType | BlogArticle |
*/
export async function getMockedLocalData_dal<T>(
  jsonfileName: LocalJSONFilename
) {
  const mockDataJsonPath = dataJsonPath + "mock/";
  const path = mockDataJsonPath + jsonfileName + ".json";
  const jsonData = await fs.readFile(process.cwd() + path, "utf8");
  const localData = JSON.parse(jsonData) as T[];
  return localData;
}