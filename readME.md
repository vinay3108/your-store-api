for build image locally
docker build -t product_service .

for run docker in background
docker run -d --name product_service -p 5006:5006 -v $(pwd):/root/ product_service