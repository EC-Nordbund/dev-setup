./runForAllSync.sh yarn build
mkdir -p ./dist
rm -r -f ./dist
cp -r ./dev-server/dist .
cp -r ./verwaltung/dist ./dist/verwaltung
cp -r ./login/dist ./dist/login
cp -r ./leiter/dist ./dist/leiter
