# Description

This project is to make fun of jop about teamkilling and stuff

# How to run

You should configure the compose file with the following environment variables. These are left empty on purpose:
```
DISCORD_TOKEN = token here
CLIENT_ID = client id here
GUILD_ID = server id here
GENERAL_CHANNEL_ID = general chat channel id here
```

## Startup

After correct configuration of the environment variables, you can use the following command to run the program:

``` docker compose up ```

Docker will pull the postgres and node.js images (if not yet done).

It can be run in the background with the following command:

``` docker compose up -d ```

## Shutting down

Stopping all the running containers is also simple with a single command:

``` docker compose down ```

If you need to stop and remove all containers, networks, and all images used by any service in docker-compose.yml file, use the command:

``` docker compose down --rmi all ```

## Extra

If new commands are added, you should reload the commands with 

```node src/deploy-commands.js```