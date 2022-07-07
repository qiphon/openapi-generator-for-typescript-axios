# OpenAPI generator 使用说明

GitHub地址： https://github.com/OpenAPITools/openapi-generator

官网其它人写的文档：https://github.com/OpenAPITools/openapi-generator#5—presentationsvideostutorialsbooks

cli 文档：https://github.com/OpenAPITools/openapi-generator-cli

非官方文档： https://www.bookstack.cn/read/openapi-generator/909443df3bc86fd6.md

yaml格式校验工具：https://editor.swagger.io/

api文档转换工具：https://lucybot-inc.github.io/api-spec-converter/

mustache 语法： https://blog.csdn.net/qiphon3650/article/details/125529789?spm=1001.2014.3001.5501

### 开发使用说明（前端）： 目前使用说明仅针对前端，其它语言执行方案需要其它语言组完成 

1. 下载javaSE  https://www.oracle.com/java/technologies/downloads/ 
2. 安装 cli 工具 @openapitools/openapi-generator-cli 
3. 执行 bash 命令
4. 一旦出现类型异常，目前需要手动查看 接口 json/yaml 文件中是否存在中文（目前openapi无法处理中文（标题和描述类内容除外），建议删除中文内容），重新执行bash命名 

```bash 
openapi-generator-cli generate -g typescript-axios \ 
    -i src/sdks/python.yaml -o src/sdks/python/ \ 
    -t ./typescript-axios --skip-validate-spec \ 
    --additional-properties supportsES6=true,nullSafeAdditionalProps=true,withSeparateModelsAndApi=true,modelPackage=models,apiPackage=apis 
``` 

### 命令参数说明 

- -g 目标文件的语言 
- -i 接口文档文件或地址 
- -o 输出文件路径 
- -t 生成输出文件使用的模板、如果未声明会使用官方默认模板 
- --skip-validate-spec 跳过文档格式校验 
- --additional-properties 自定义字段，可供模板中使用 
- withSeparateModelsAndApi 拆分 model 和 api 文件 （默认 model 和 api 会在同一个文件内） 
- 使用 withSeparateModelsAndApi 时需要额外定义2个变量 
- modelPackage 拆分后model 文件存放的文件夹 
- apiPackage 拆分后api 文件存放的文件夹 

### 更多命令请查看帮助命令 

> openapi-generator-cli help

/Desktop/openapi-test/openapitools.json config file
Usage: openapi-generator-cli <command> [<args>]

Options:
  --custom-generator <generator>  Custom generator jar

Commands:
  version-manager                 Manage used / installed generator version
  author                          Utilities for authoring generators or customizing templates.
  batch                           Generate code in batch via external configs.
  config-help                     Config help for chosen lang
  generate [options]              Generate code with the specified generator.
  help                            Display help information about openapi-generator
  list                            Lists the available generators
  meta                            MetaGenerator. Generator for creating a new template set and configuration for Codegen.  The output will be based on the language you
                                  specify, and includes default templates to include.
  validate                        Validate specification
  version                         Show version information used in tooling



> openapi-generator-cli config-help -g typescript-axios

/Desktop/openapi-test/openapitools.json config file

CONFIG OPTIONS

        allowUnicodeIdentifiers
            boolean, toggles whether unicode identifiers are allowed in names or not, default is false (Default: false)

        disallowAdditionalPropertiesIfNotPresent
            If false, the 'additionalProperties' implementation (set to true by default) is compliant with the OAS and JSON schema specifications. If true (default), keep the old (incorrect) behaviour that 'additionalProperties' is set to false by default. (Default: true)
                false - The 'additionalProperties' implementation is compliant with the OAS and JSON schema specifications.
                true - Keep the old (incorrect) behaviour that 'additionalProperties' is set to false by default.

        ensureUniqueParams
            Whether to ensure parameter names are unique in an operation (rename parameters that are not). (Default: true)

        enumNameSuffix
            Suffix that will be appended to all enum names. (Default: Enum)

        enumPropertyNaming
            Naming convention for enum properties: 'camelCase', 'PascalCase', 'snake_case', 'UPPERCASE', and 'original' (Default: PascalCase)

        enumUnknownDefaultCase
            If the server adds new enum cases, that are unknown by an old spec/client, the client will fail to parse the network response.With this option enabled, each enum will have a new case, 'unknown_default_open_api', so that when the server sends an enum case that is not known by the client/spec, they can safely fallback to this case. (Default: false)
                false - No changes to the enum's are made, this is the default option.
                true - With this option enabled, each enum will have a new case, 'unknown_default_open_api', so that when the enum case sent by the server is not known by the client/spec, can safely be decoded to this case.

        legacyDiscriminatorBehavior
            Set to false for generators with better support for discriminators. (Python, Java, Go, PowerShell, C#have this enabled by default). (Default: true)
                true - The mapping in the discriminator includes descendent schemas that allOf inherit from self and the discriminator mapping schemas in the OAS document.
                false - The mapping in the discriminator includes any descendent schemas that allOf inherit from self, any oneOf schemas, any anyOf schemas, any x-discriminator-values, and the discriminator mapping schemas in the OAS document AND Codegen validates that oneOf and anyOf schemas contain the required discriminator and throws an error if the discriminator is missing.

        npmName
            The name under which you want to publish generated npm package. Required to generate a full package

        npmRepository
            Use this property to set an url of your private npmRepo in the package.json

        npmVersion
            The version of your npm package. If not provided, using the version from the OpenAPI specification file. (Default: 1.0.0)

        nullSafeAdditionalProps
            Set to make additional properties types declare that their indexer may return undefined (Default: false)

        paramNaming
            Naming convention for parameters: 'camelCase', 'PascalCase', 'snake_case' and 'original', which keeps the original name (Default: camelCase)

        prependFormOrBodyParameters
            Add form or body parameters to the beginning of the parameter list. (Default: false)

        snapshot
            When setting this property to true, the version will be suffixed with -SNAPSHOT.yyyyMMddHHmm (Default: false)

        sortModelPropertiesByRequiredFlag
            Sort model properties to place required parameters before optional parameters. (Default: true)

        sortParamsByRequiredFlag
            Sort method arguments to place required parameters before optional parameters. (Default: true)

        stringEnums
            Generate string enums instead of objects for enum values. (Default: false)

        supportsES6
            Generate code that conforms to ES6. (Default: false)

        useSingleRequestParameter
            Setting this property to true will generate functions with a single argument containing all API endpoint parameters instead of one argument per parameter. (Default: false)

        withInterfaces
            Setting this property to true will generate interfaces next to the default class implementations. (Default: false)

        withNodeImports
            Setting this property to true adds imports for NodeJS (Default: false)

        withSeparateModelsAndApi
            Put the model and api in separate folders and in separate classes (Default: false)

        withoutPrefixEnums
            Don't prefix enum names with class names (Default: false)