@echo off
cd /d "%~dp0..\artifacts\api-server"
set NODE_ENV=development
node --enable-source-maps .\dist\index.mjs >> "..\..\logs\api-server.log" 2>&1
