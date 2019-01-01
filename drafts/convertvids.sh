#!/bin/bash
mkdir -p out
for vid in $@; do
  echo $vid
  ffmpeg -i $vid -an -crf 30 -b:v 0 -s 960x540 -vcodec libvpx-vp9 out/$vid
  ffmpeg -i $vid -an -crf 25 -s 960x540 -vcodec libx264 -preset slow -profile:v baseline -level 3.0 out/${vid%.*}.mp4
done
