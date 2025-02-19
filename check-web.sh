#!/bin/bash

DURATION=$(</dev/stdin)
if (($DURATION <= 20000)); then
    exit 60
else
    if ! curl --silent --fail http://jellyfin.embassy:8096/health &>/dev/null; then
        echo "Web interface is unreachable" >&2
        exit 1
    fi
fi
