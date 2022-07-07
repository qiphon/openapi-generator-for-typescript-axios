const { exec } = require('child_process');

// 文档地址
const serverHost = 'https://raw.githubusercontent.com';
const servers = [
  '/swagger-api/swagger-codegen/master/modules/swagger-codegen/src/test/resources/petstore.json',
];

console.log(
  '===================sdk building ... =============================',
);
console.log('||');
console.log(`|| server using  ${serverHost}  ||`);
console.log('||');
console.log(
  '===================sdk building ... =============================',
);

servers.forEach(api => {
  const serverName = api.split('/')[1];
  console.log(
    `=================${serverName} server start======================`,
  );
  console.log('||');
  console.log(`|| server using  ${serverHost}  ||`);
  console.log('||');
  console.log('|| ', serverName, 'is building ...');
  exec(
    `java -jar ./openapi-generator-cli.jar generate -g typescript-axios  -i ${
      serverHost + api
    } -o ./src/sdks/${serverName}  -t ./typescript-axios  --skip-validate-spec  --additional-properties supportsES6=true,nullSafeAdditionalProps=true,withSeparateModelsAndApi=true,modelPackage=models,apiPackage=apis`,
    {},
    error => {
      console.log(serverName, 'build finish with error: --', error); // 一个 AbortError

      console.log('||');
      console.log(
        `=================${serverName} server end======================`,
      );
    },
  );
});
