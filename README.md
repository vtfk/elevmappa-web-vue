# elevmappa-web

## Local setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Docker local build

### Build docker
```
docker build --tag elevmappa-web .
```

### Run docker
```
docker run -d -p 8080:8080 -it elevmappa-web
```

## Dockerhub image

Create a **private repo** on [dockerhub](https://hub.docker.com/).

In "configure automated build" set desired environment variables.

![Dockerhub](https://i.imgur.com/pGtdo1J.png)


# Flow

![draw.io](https://i.imgur.com/fVFHw45.png)

# License
[MIT](LICENSE)
