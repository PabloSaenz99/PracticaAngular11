# Angular11 with dockers
## Docker commands:
- Build an image:
```bash
docker build -t image_tag:tag directory-with-dockerfile
```
- Create a docker
```bash
docker run -d --name container-name -p host-port:final-port image-name
```
- Show all images:
```bash
docker images (-a)
```  
- Remove al dockers and images:
```bash
docker system prune -a
```
- Build all dockers from yml:
```bash
docker-compose up --build
```
