@ECHO OFF
ECHO SLOT Batch Script Setting up project
ECHO Installing NPM packages...
cmd /C npm install

REM Installing gulp-cli if not done already
SET OUTPUT=""
FOR /F "tokens=*" %%a in ('npm list -g ^| find /n "gulp-cli"') do SET OUTPUT=%%a
IF "%OUTPUT%" == """" (
	ECHO Installing gulp-cli...
	cmd /C npm install -g gulp-cli
)

REM Installing typescript if not done already
SET OUTPUT=""
FOR /F "tokens=*" %%a in ('npm list -g ^| find /n "typescript"') do SET OUTPUT=%%a
IF "%OUTPUT%" == """" (
	ECHO Installing Typescript...
	cmd /C npm install -g typescript
)

ECHO Linking TypeScript...
cmd /C npm link typescript

ECHO Initialising Gulp...
cmd /C gulp init

