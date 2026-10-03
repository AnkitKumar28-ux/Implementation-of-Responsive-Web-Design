@echo off
title NovaFlow Localhost Web Server
cd /d "%~dp0"
echo Starting NovaFlow Static Web Page on http://localhost:8000 ...
start "" "http://localhost:8000"
node server.js
pause
