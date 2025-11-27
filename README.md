# fullstack-open
Excerises for the Full Stack Open MOOC

Phonebook for part 3 can be found from:
https://phonebook-a9b4fkgdc9cxbyaz.swedencentral-01.azurewebsites.net/

Using Azure Apps as the F1 tier is free, and I am familiar with this from before. Deployment is done with Github actions.

Using App Service env variable SCM_DO_BUILD_DURING_DEPLOYMENT=false as the Oryx build kept on trying to build PHP. Build is done in the yml and deployed as a zip. Build command is defined in package.json.