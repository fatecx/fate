#!/bin/sh
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/trailer/fate-launch-60s.mp4"
ffmpeg -y \
  -framerate 24 -i "$ROOT/trailer/frames/f%05d.jpg" \
  -i "$ROOT/public/music-directions/d_machine_memory_v3.mp3" \
  -i "$ROOT/public/sfx/fol_pen.mp3" \
  -i "$ROOT/public/sfx/sting_boom.mp3" \
  -filter_complex "\
[1:a]volume=0.90[a0];\
[2:a]adelay=14200|14200,volume=0.55[a1];\
[3:a]adelay=55100|55100,volume=0.85[a2];\
[a0][a1][a2]amix=inputs=3:duration=first:dropout_transition=2:normalize=0,\
afade=t=out:st=58.2:d=1.6[a]" \
  -map 0:v -map "[a]" \
  -c:v libx264 -pix_fmt yuv420p -crf 16 -preset medium \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  -t 60 \
  "$OUT"
echo "wrote $OUT"
ls -lh "$OUT"
