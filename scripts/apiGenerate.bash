#!/usr/bin/env bash

FILE_PATH=$1
OUT_PATH=$2

if [[ $FILE_PATH == '' || $OUT_PATH == '' ]]; then
    echo 'FILE_PATH or OUT_PATH can not empty !' 
    exit 1;
fi;

echo ' FILE_PATH  is ' $FILE_PATH
echo ' OUT_PATH  is ' $OUT_PATH

openapi-generator-cli generate -g typescript-axios \
    -i $FILE_PATH -o $OUT_PATH \
    -t ./typescript-axios  --skip-validate-spec \
    --additional-properties supportsES6=true,nullSafeAdditionalProps=true,withSeparateModelsAndApi=true,modelPackage=models,apiPackage=apis

