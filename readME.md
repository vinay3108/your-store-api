for build image locally
docker build -t product_service .

for run docker in background
docker run -d --name product_service -p 5006:5006 -v $(pwd):/root/ product_service

for create migration
npx typeorm-ts-node-commonjs migration:run -d ./db/db.connection.ts

for revert migration
 npx typeorm-ts-node-commonjs migration:revert -d ./db/mysql.connection.ts
