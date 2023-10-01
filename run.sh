git pull
docker stop doza_front_con || true
docker rm doza_front_con || true
docker build -t doza_front .
docker run -d -p 9090:9090 --name doza_front_con doza_front