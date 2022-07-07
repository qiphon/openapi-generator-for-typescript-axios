/**
 * @desc 获取 openapi 文件
 */
import { extname, join } from "https://deno.land/std@0.146.0/path/mod.ts";
export const getOpenapiFiles = async (folder: string) => {
  const yamls: string[] = [];
  const jsons: string[] = [];

  for await (const dirEntry of Deno.readDir(folder)) {
    if (dirEntry.isFile) {
      if (extname(dirEntry.name) === ".yaml") {
        yamls.push(join(folder, dirEntry.name));
      }
      if (extname(dirEntry.name) === ".json") {
        jsons.push(join(folder, dirEntry.name));
      }
    }
  }
  return [yamls, jsons];
};
