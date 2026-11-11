#!/bin/bash
# usage: fetch.sh <n> <url>  -> legN.mp4, legN_sheet.jpg, legN_last.png
set -e
n=$1; curl -sS --retry 3 -o leg$n.mp4 "$2"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=p=0 leg$n.mp4
ffmpeg -v error -y -i leg$n.mp4 -vf "fps=1.5,scale=480:-1,tile=4x3" -frames:v 1 leg${n}_sheet.jpg
ffmpeg -v error -y -sseof -0.15 -i leg$n.mp4 -frames:v 1 -q:v 1 leg${n}_last.png
ffmpeg -v error -y -i leg${n}_last.png -vf scale=1100:-1 leg${n}_last_view.jpg
ls -la leg${n}_last.png
