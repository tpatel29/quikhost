// function dockerfileContent (){
//     return `FROM traefik:v2.5.2
//     WORKDIR /traefik
//     COPY ./traefik.yml .
//     RUN mkdir /logs
//     RUN touch /logs/traefik.log
//     ENTRYPOINT ["traefik"]`;
// }

const dockerfileContent = `FROM traefik:v2.5.2
WORKDIR /traefik
COPY ./traefik.yml .
RUN mkdir /logs
RUN touch /logs/traefik.log
ENTRYPOINT ["traefik"]`;


const dockerComposeContent = (answers) => 

`version: "3.8"

services:
  traefik:
    build: .
    container_name: traefik
    restart: always
    ports:
      - 80:80
      - 443:443
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /data/letsencrypt:/letsencrypt
      - ./logs:/logs
    networks:
      - traefik
    labels:
      - traefik.enable=true
      - traefik.http.routers.traefik_https.rule=Host(\`${answers.website}\`)
      - traefik.http.routers.traefik_https.entrypoints=https
      - traefik.http.routers.traefik_https.tls=true
      - traefik.http.routers.traefik_https.tls.certResolver=simple-resolver
      - traefik.http.routers.traefik_https.service=api@internal

networks:
  traefik:
    name: traefik
    external: true`;





const traefikYmlContent = (answers) => 
`# traefik.yml

log:
  level: DEBUG
  filePath: "/logs/traefik.log"
  format: json

api:
  dashboard: true
  insecure: true

providers:
  docker:
    network: traefik
    exposedByDefault: false

entrypoints:
  http:
    address: :80
    http:
      redirections:
        entryPoint:
          to: https
          scheme: https
          permanent: true
  https:
    address: :443

certificatesResolvers:
  simple-resolver:
    acme:
      httpchallenge:
        entrypoint: http
      email: ${answers.email}
      storage: /letsencrypt/acme.json

accesslog: true`;

export {dockerfileContent, traefikYmlContent, dockerComposeContent};