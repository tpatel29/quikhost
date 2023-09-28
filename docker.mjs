const dockerContent = (answers) => 
`version: "3.8"

services:
    ${answers.service}:
    image: ${answers.service}
    container_name: ${answers.service}
    pull_policy: always
    restart: always
    networks:
       - traefik
       - backend
    ports:
      - "3000"
    labels:
      - com.centurylinklabs.watchtower.enable=true
      - traefik.enable=true
      - traefik.docker.network=traefik
      - traefik.http.routers.${answers.service}.rule=Host(\`www.${answers.website}\`) || Host(\`${answers.website}\`)
      - traefik.http.routers.${answers.service}.entrypoints=https
      - traefik.http.routers.${answers.service}.tls=true
      - traefik.http.routers.${answers.service}.tls.certresolver=simple-resolver
      - traefik.http.services.${answers.service}.loadbalancer.server.port=${answers.port}
networks:
  traefik:
      name: traefik
      external: true
  backend:
      name: backend
      external: true`;

export {dockerContent};