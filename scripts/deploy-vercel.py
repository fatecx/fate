#!/usr/bin/env python3
"""Deploy ./dist to the buxor Vercel account as project 'fate'.

No GitHub integration exists between fatecx and Vercel, so pushes ship via
this script:  npm run build && npm run deploy
Requires VERCEL_TOKEN_BUXOR in the environment (it lives in ~/.tokens).
"""
import base64
import json
import os
import sys
import time
import urllib.request

TOK = os.environ.get('VERCEL_TOKEN_BUXOR')
if not TOK:
    sys.exit('VERCEL_TOKEN_BUXOR not set')

def api(path, body=None, method='GET'):
    req = urllib.request.Request(
        f'https://api.vercel.com{path}', data=json.dumps(body).encode() if body else None,
        method=method, headers={'Authorization': f'Bearer {TOK}', 'Content-Type': 'application/json'})
    return json.load(urllib.request.urlopen(req))

team = api('/v2/teams?limit=20')['teams'][0]['id']
qs = f'?teamId={team}'

files = []
for root, _, names in os.walk('dist'):
    for n in names:
        p = os.path.join(root, n)
        rel = os.path.relpath(p, 'dist').replace(os.sep, '/')
        files.append({'file': rel,
                      'data': base64.b64encode(open(p, 'rb').read()).decode(),
                      'encoding': 'base64'})

dep = api(f'/v13/deployments?skipAutoDetectionConfirmation=1{qs}',
          {'name': 'fate', 'target': 'production', 'files': files,
           'projectSettings': {'framework': None}}, 'POST')
print('deployment:', dep['id'], dep['url'])

for _ in range(40):
    d = api(f"/v13/deployments/{dep['id']}{qs}")
    if d['readyState'] in ('READY', 'ERROR', 'CANCELED'):
        print(d['readyState'])
        sys.exit(0 if d['readyState'] == 'READY' else 1)
    time.sleep(3)
