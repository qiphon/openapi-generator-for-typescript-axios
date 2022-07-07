// 生成 OpenAPI 文档

import * as path from "https://deno.land/std@0.146.0/path/mod.ts";
import { parse } from "https://deno.land/std@0.82.0/encoding/yaml.ts";
import { convertJson2Yaml, PATHS } from "./configs/constant.deno.ts";
import { getOpenapiFiles } from "./configs/index.ts";

const [yamls, jsons] = await getOpenapiFiles(PATHS.yamlFolder);

console.log(yamls, jsons);
// debugger;
// console.log(yamlResult);
// 删除临时文件夹
const yamlTmpFile = path.resolve(PATHS.yamlFolder, "./tmps");
try {
  await Deno.remove(yamlTmpFile, { recursive: true });
} catch {}
try {
  await Deno.mkdir(yamlTmpFile);
} catch (e) {
  console.log("确保deno 有文件读写权限");
  Deno.exit(1);
}

// json 文件转为 yaml 文件
for (const jsonFilePath of jsons) {
  const yamls = await convertJson2Yaml(jsonFilePath);
  const names = path.basename(jsonFilePath);
  const encoder = new TextEncoder();
  const data = encoder.encode(yamls);
  console.log(data, "yaml");
  Deno.writeFile(path.resolve(yamlTmpFile, names.slice(0, -4) + "yaml"), data, {
    create: true,
  });
}

// 执行yaml 文件，生成api
for (const yamlFile of yamls) {
  const yamlResult: any = parse(await Deno.readTextFile(yamlFile));
  console.log(yamlResult?.info?.title);
  const p = Deno.run({
    cmd: [
      path.resolve(PATHS.homePath, "scripts/apiGenerate.bash"),
      "111",
      "66",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { code } = await p.status();
  const rawOutput: Uint8Array = await p.output();
  const rawError: Uint8Array = await p.stderrOutput();

  if (code === 0) {
    await Deno.stdout.write(rawOutput);
  } else {
    await Deno.stdout.write(Uint8Array.from([...rawOutput, ...rawError]));
    Deno.exit(code);
  }
}
