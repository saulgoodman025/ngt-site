#!/bin/bash
# usage: encode.sh <n>  -> assets/vid/legN.mp4 (1080p desktop) and legN-m.mp4 (720p, tighter GOP, for phones)
set -e
n=$1; src=work/vid/leg$n.mp4
ffmpeg -v error -y -i $src -an -vf "unsharp=5:5:0.8:5:5:0.0" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart assets/vid/leg$n.mp4
ffmpeg -v error -y -i $src -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart assets/vid/leg$n-m.mp4
ls -la assets/vid/leg$n.mp4 assets/vid/leg$n-m.mp4 | awk '{print $5, $9}'
