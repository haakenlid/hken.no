#!/bin/bash

# starts a jupyterlab notebook server
exec jupyter lab \
  --notebook-dir=/var/notebooks \
  --NotebookApp.token='' \
  --NotebookApp.password='' \
  --no-browser \
  --ip=0.0.0.0

