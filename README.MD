1. npm i
2. put ttl file in ./files/ttl/{here}
3. put KG file in ./files/kgFile/{here}
4. Change necessary values in main() function in ./index.js file
5. create .env file like this (change domains here only by comment/uncomment):
   # BASE_URL="https://ig.aidtaas.com"
   BASE_URL="https://ig.gov-cloud.ai"
   # CDN_URL="https://cdn.aidtaas.com"
   CDN_URL="https://cdn.gov-cloud.ai"
   OPEN_AI_KEY=token
6. run 'npm start'
7. On every run, new object will be added in history.json