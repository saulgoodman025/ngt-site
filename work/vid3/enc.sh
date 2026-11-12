#!/bin/bash
# usage: enc.sh <srcname> <outname>   (run from repo root) -> work/vid3/out/<outname>.mp4 and -m.mp4
set -e
src=work/vid3/$1.mp4; o=work/vid3/out/$2
ffmpeg -v error -y -i $src -an -vf "unsharp=5:5:0.8:5:5:0.0" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart $o.mp4
ffmpeg -v error -y -i $src -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart $o-m.mp4
