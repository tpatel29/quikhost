// cli.mjs
import { Command } from 'commander/esm.mjs'; 
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

import {dockerfileContent, dockerComposeContent, traefikYmlContent} from "./traefik.mjs";
import {watchtowerContent} from "./watchtower.mjs"
import {dockerContent} from "./docker.mjs"




const program = new Command();
program.version('1.0.0');

program
  .command('init')
  .description('Initialize a folder with Traefik configuration files')
  .action(async () => {
    var folderName = 'traefik';
    fs.mkdirSync(folderName);

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email:',
      },
      {
        type: 'input',
        name: 'website',
        message: 'Enter your website name:',
      },
    ]);
    fs.writeFileSync(path.join(folderName, 'Dockerfile'), dockerfileContent);
    fs.writeFileSync(path.join(folderName, 'docker-compose.yml'), dockerComposeContent(answers));
    fs.writeFileSync(path.join(folderName, 'traefik.yml'), traefikYmlContent(answers));

    console.log(`Initialized "${folderName}" with Traefik configuration files.`);

    folderName = "watchtower";
    fs.mkdirSync(folderName);

    fs.writeFileSync(path.join(folderName, 'docker-compose.yml'), watchtowerContent);
    console.log(`Initialized "${folderName}" with Watchtower configuration files.`);
  });


  program
  .command('docker')
  .description('Host a Docker Image')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'service',
        message: 'Enter your Serivce:',
      },
      {
        type: 'input',
        name: 'website',
        message: 'Enter your website name with sub domain:',
      },
      {
        type: 'input',
        name: 'port',
        message: 'Enter port:',
      },
    ]);

    let folderName = answers.service;
    fs.mkdirSync(folderName);
    fs.writeFileSync(path.join(folderName, 'docker-compose.yml'), dockerContent(answers));

    console.log(`Initialized "${folderName}".`);
  });

program.parse(process.argv);
