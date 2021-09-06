#!/bin/sh
# line endings must be \n, not \r\n !
echo "window._env_ = {" > ./admin/env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env >> ./admin/env-config.js
echo "}" >> ./admin/env-config.js
