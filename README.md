# Lyubimovstudio

This project was generated using [Nx](https://nx.dev/angular).

Project consist of 4 parts:
- [Admin](apps/admin/README.md) is Angular application for administration part.
- [Client](apps/client/README.md) is React application for the site frontend.
- [API](apps/client/README.md) is NestJS application for the project API.
- [SSR Server](apps/client/README.md) is Express server that renders client app on a server.

## Development

### Before start

Run this command to pull all necessary docker containers.

```bash
  npm run docker-pull-all-images
```

### Launch

To launch dev development use command:
```bash
  npm install
  npm run dev
```
This launch all project parts except SSR in watch mode (SRR is used only on prod). Also it creates two docker images: postgres db image and pgamin for this db.

 - Admin part url is [http://localhost:4300](http://localhost:4300)

 - Client url is [http://localhost:4200](http://localhost:4200)

 - API url is [http://localhost:3333](http://localhost:3333), but it is proxied for admin and client as `/api` the same as the `/uploads` folder.

## Production images

### Before start

Before start building prod docker images, you need to make several steps to launch it.

1. Create uploads volume. It will be containing images uploaded from the admin part.

```bash
  docker volume create uploads
```

2. Create self-signed ssl certificate and its private key or put existed ones to `docker/init/site.req.pem` and `docker/init/site.key.pem`.
More detailed about how to create self-signed certificates look [here](https://stackoverflow.com/a/27931596/2918518). Also you can use this command.
```bash
  npm run generate-cert
```

3. Set up enviroment variables. Clone `.env` file to `.prod.env`.
 - DB_SYNCHRONIZE is [typeorm](https://typeorm.io/#/connection-options/common-connection-options) `synchronize` option.
 - DB_LOGGING is [typeorm](https://typeorm.io/#/connection-options/common-connection-options) `logging` option.
 - GMAIL_USER is user that will be used to send mail from.
 - GMAIL_PASSWORD is password of the prev user.
 - OWNER_EMAIL is the email to where mail will be sent.

### Launch

To create production build you need to run this command:

```bash
  npm run prod
```

It creates one intermediate image called `lyubimovstudio-build` and four images that is necessary to launch the project. These four images are `lyubimovstudio-db`, `lyubimovstudio-api`, `lyubimovstudio-server`,
`lyubimovstudio-ssr`.
