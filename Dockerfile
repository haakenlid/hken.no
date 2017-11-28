FROM haakenlid/jupyter-opencv:3.6
MAINTAINER haakenlid

USER root
RUN curl -sL https://deb.nodesource.com/setup_9.x | /bin/bash -
RUN apt-get update && apt-get install -y nodejs
RUN pip install pytest pytest-xdist Pillow
USER jupyter

ENV PYTHONPATH="/var/notebooks"
WORKDIR /var/notebooks
ENTRYPOINT /docker-entrypoint.sh
