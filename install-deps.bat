@echo off
echo Initializing Node.js project (if needed)...
IF NOT EXIST package.json (
    npm init -y
)

echo Installing latest versions of required dependencies...
npm install electron basic-ftp

echo.
echo Setup complete. You can now run the app using:
echo   ->npm start

pause
