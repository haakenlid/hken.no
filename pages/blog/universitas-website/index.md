![image](./index.jpg)

I've built the web site [universitas.no][universitas.no]. This is a full stack
project, so I've done the graphic design, the frontend react.js app, the backend
Django application and managed the servers, deployment pipeline, testing, user
support and a lot more.

All the code is open sourced under the Apache licence, and available at
[GitHub][source]

## About the project

This is a project that has grown a lot in scope as I have been working on it. I
started by creating a Django site to replace a legacy and hard-to-maintain php
site. In addition the coding, a big part of the initial process mas migrating,
organize and clean up many years of text and photo content.

In the first version of the site I used the django template engine and the Zurbs
Foundation css framework for the frontend styling.

I later replaced all of the front end code with a new site with a frontend
written entirely with react.js. The core of the application is still Django, but
it's not used for template rendering, which is done with react.js instead.

The project also includes a custom made [content management system][cms], also
made with react.js, and a suite of [InDesign plugins][scripts] integrating the
web application with the print edition workflow.

## The stack in brief

The web application consists of several services running in **Docker**
containers.

- **Django** web application with uWSGI server
- **Celery** asynchronous job queue also using the same Docker image
- **Rabbitmq** message broker for Celery
- **Postgresql** relational database management system
- **Redis** cache backend for the Django application
- **Nodejs/Express** server for server side rendering of react.js
- **Certbot** service manages the https certificates
- **Nginx** reverse proxy / web server with pagespeed extensions installed

I use **Webpack** for bundling, and tests are written using **Jest** for
javascript and **Pytest** for the python code.

The server is hosted on a [Digital Ocean] droplet, and we also use Digital Ocean's
content delivery network to serve images and pdf files.

[Sentry] provides error tracking in production and [Travis] is used for
continuous integration.

## Resources and links

- [universitas.no] The web site
- [GitHub repo][source] with the source code

[archive]: https://universitas.no/pdf/
[cms]: /blog/universitas-cms/
[scripts]: https://github.com/universitas/tassendesken
[source]: https://github.com/universitas/universitas.no
[django]: https://www.djangoproject.com/
[universitas.no]: https://universitas.no/
[sentry]: https://sentry.io/
[travis]: https://travis-ci.org/universitas/universitas.no
[digital ocean]: https://www.digitalocean.com

<!-- vim: set ft=markdown spl=en spell :-->
