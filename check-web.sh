#!/bin/bash

DURATION=$(</dev/stdin)
if (($DURATION <= 30000)); then
    exit 60
else
    if ! curl --silent --fail jellyfin.embassy:8096 &>/dev/null; then
        echo "Web interface is unreachable" >&2
        exit 1
    fi
fi
