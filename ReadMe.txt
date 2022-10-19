in order to run the server with this steps you will need to have:
* docker
* POSTGRES_DB
* postman


in order to run the server you will need to follow this steps:
* run command on cmd to run a container on docker -
    docker-compose up
* run command on cmd to build the DB tables - 
    npm run migrate

if docker compose up does not work use this command instead:
run command on cmd to run a container on docker -
    docker run --name optival-server -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=optival-data-feed-server -d postgres