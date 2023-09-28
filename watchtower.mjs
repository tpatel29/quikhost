const watchtowerContent = 
`version: "3.8"

services:
    watchtower:
      image: containrrr/watchtower
      networks:
        - backend
      container_name: watchtower 
      command: --interval 30 --label-enable --cleanup
      volumes:
        - /var/run/docker.sock:/var/run/docker.sock
      
      labels:
        com.centurylinklabs.watchtower.enable: true
      restart: always
networks:
    backend:
      external: true`;

export {watchtowerContent};