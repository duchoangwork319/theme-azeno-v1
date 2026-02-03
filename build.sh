#!/bin/bash

npx esbuild --bundle --platform=browser --outdir=assets/dist assets/main.js

npx babel assets/dist --out-dir assets/dist --presets=@babel/preset-env --source-type=script