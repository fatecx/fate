#!/bin/sh
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/trailer/fate-launch-90s.mp4"
ffmpeg -y \
  -framerate 24 -i "$ROOT/trailer/frames-90/f%05d.jpg" \
  -i "$ROOT/public/music-v2/v2_first_walk_v1.mp3" \
  -i "$ROOT/public/sfx/fol_pen.mp3" \
  -i "$ROOT/public/sfx/sting_boom.mp3" \
  -filter_complex "\
[1:a]volume=0.95[a0];\
[2:a]adelay=22600|22600,volume=0.55[a1];\
[3:a]adelay=86200|86200,volume=0.85[a2];\
[a0][a1][a2]amix=inputs=3:duration=first:dropout_transition=2:normalize=0,\
afade=t=out:st=88.2:d=1.6[a]" \
  -map 0:v -map "[a]" \
  -c:v libx264 -pix_fmt yuv420p -crf 20 -preset medium \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  -t 90 \
  "$OUT"
echo "wrote $OUT"
ls -lh "$OUT"
