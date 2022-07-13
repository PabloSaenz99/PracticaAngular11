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

## Testing frontend:
https://shashankvivek-7.medium.com/testing-basic-html-elements-using-karma-jasmine-in-angular-fd5e4ac62d78  
https://blog.logrocket.com/angular-unit-testing-tutorial-examples/

## Testing backend:
Basic instructions and configuration:  
https://ducmanhphan.github.io/2018-12-17-ava-test-framework/  
Promises and imports:  
https://dimitr.im/nodejs-ava
- Run test (run command in backend folder):
```bash
npm test
```

- Express + mongoose:  
https://github.com/avajs/ava/blob/main/docs/recipes/endpoint-testing-with-mongoose.md  
https://github.com/zellwk/ava/blob/8b7ccba1d80258b272ae7cae6ba4967cd1c13030/docs/recipes/endpoint-testing-with-mongoose.md
