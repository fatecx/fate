#!/bin/sh
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/trailer/fate-launch-60s.mp4"
HIT=/tmp/fate-salazar-end.mp3
# First 2s of the Salazar connect, slowed ~10% with pitch, faded.
ffmpeg -y -i "$ROOT/public/sfx/scn_t_salazar_contract.mp3" \
  -af "atrim=0:2.0,asetpts=PTS-STARTPTS,asetrate=44100*0.90,aresample=44100,afade=t=out:st=1.85:d=0.37,volume=3.0" \
  -t 3 "$HIT"
ffmpeg -y \
  -framerate 24 -i "$ROOT/trailer/frames/f%05d.jpg" \
  -i "$ROOT/public/music-directions/d_machine_memory_v3.mp3" \
  -i "$ROOT/public/sfx/fol_pen.mp3" \
  -i "$HIT" \
  -filter_complex "\
[0:v]pad=1920:1200:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p[v];\
[1:a]volume=0.90[a0];\
[2:a]adelay=14200|14200,volume=0.55[a1];\
[3:a]adelay=55500|55500,volume=1.0[a2];\
[a0][a1][a2]amix=inputs=3:duration=first:dropout_transition=2:normalize=0,\
afade=t=out:st=58.2:d=1.6[a]" \
  -map "[v]" -map "[a]" \
  -c:v libx264 -pix_fmt yuv420p -crf 16 -preset medium \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  -t 60 \
  "$OUT"
echo "wrote $OUT"
ls -lh "$OUT"
