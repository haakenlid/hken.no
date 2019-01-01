#!/bin/bash

for vid in $@; do 
  echo $vid
  ffmpeg -i $vid -an -crf 30 -b:v 0 -s 960x540 -vcodec libvpx-vp9 out/$vid
  ffmpeg -i $vid -an -crf 25 -s 960x540 -vcodec libx264 out/${vid%.*}.mp4
done
