/**
 * 自定义配置文件夹
 */

import * as path from "https://deno.land/std@0.146.0/path/mod.ts";
import YAML from "./js-yaml.js";

const homePath = path.resolve(
  path.dirname(path.fromFileUrl(import.meta.url)),
  "../../",
);

export const PATHS = {
  homePath,
  yamlFolder: path.resolve(homePath, "./sdk-files/"),
  sdkOutFolder: path.resolve(homePath, "src/sdks"),
};

export const convertJson2Yaml = async (
  path: string,
): Promise<string | undefined> => {
  let originalStr;
  try {
    originalStr = await Deno.readTextFile(path);
  } catch (e) {
    // throw new Error(e)
    console.log(e, "read file error: ", path);
    return;
  }
  debugger;
  let yamlString;
  try {
    yamlString = YAML.dump(YAML.load(originalStr), {
      lineWidth: -1, // don't generate line folds
    });
    console.log(yamlString, "yaml str");
  } catch (e) {
    return;
  }
  // using SelectionRange instead of CursorPosition, because:
  // SR.start|end === CP when there's no selection
  // and it catches indentation edge cases when there is one
  // const padding = makePadding(editor.getSelectionRange().start.column);
  return yamlString;
};

function makePadding(len: number) {
  let str = "";

  while (str.length < len) {
    str += " ";
  }

  return str;
}
