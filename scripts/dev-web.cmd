@echo off
cd /d "%~dp0..\artifacts\infinity-fitness"
node .\node_modules\vite\bin\vite.js --config vite.config.ts --host 0.0.0.0 >> "..\..\logs\web-dev.log" 2>&1
