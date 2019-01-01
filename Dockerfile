FROM haakenlid/jupyter-opencv:3.6
MAINTAINER haakenlid
RUN curl -sL https://deb.nodesource.com/setup_10.x | /bin/bash -
RUN apt-get update && apt-get install -y nodejs
RUN pip install pytest pytest-xdist Pillow
EXPOSE 8888
ENV PYTHONPATH="/var/notebooks"
VOLUME /var/notebooks
WORKDIR /var/notebooks
RUN groupadd --gid 1000 jupyter &&\
  useradd --uid 1000 --gid 1000 --shell /bin/bash --create-home jupyter
RUN chown jupyter:jupyter /var/notebooks
USER jupyter
ENTRYPOINT ./docker-entrypoint.sh
