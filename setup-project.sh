#!/bin/bash
red='\033[0;31m'
white='\033[1;37m'
cc='\033[0m' # Clear Color
echo -e "Shell Script ${red}Setting up project${cc}"
echo -e "${white}Installing${cc} NPM packages..."
npm install

# Installing globally gulp-cli if not done already
if [[ -z $(npm list -g | grep gulp-cli) ]]
then
	echo -e "${white}Installing${cc} gulp-cli..."
	npm install -g gulp-cli
fi

# Installing globally typescript if not done already
if [[ -z $(npm list -g | grep typescript) ]]
then
	echo -e "${white}Installing${cc} TypeScript..."
	npm install -g typescript
fi

echo -e "${white}Linking${cc} TypeScript..."
npm link typescript

echo -e "${white}Initialising${cc} Gulp..."
gulp init
