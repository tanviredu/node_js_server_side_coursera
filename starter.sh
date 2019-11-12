#!/bin/bash
mkdir model
touch model/model.js
mkdir controller
touch controller/controller.js
mkdir -p views/layout
mkdir -p views/static
touch views/index.html
echo "<html><body><h1>Express App</h1></body></html>" > views/index.html
touch index.js
touch .gitignore
echo "node_modules" > .gitignore
touch README.md
echo "Node app" > README.md
npm init
npm install express --save
npm install nodemon --save
npm install mongoose --save
npm install bootstrap --save
git init
git add .
git commit -m 'initial commit'

echo "change the package.json and input a start script"

vim package.json


