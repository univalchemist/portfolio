#!/bin/bash
sudo chmod -R 777 /app/ubuntu/app/portfolio
#navifate into our worling directory where we have all our github files
cd /home/ubuntu/app/portfolio

#add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # loads nvm bash_copletion (node is in)

#install node modules
npm install