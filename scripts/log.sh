#!/bin/bash

# utilizing autochange (https://github.com/clxrityy/autochange) for logging changes to files

# Usage: log.sh <added|changed|deprecated|removed|fixed|security> <scope (optional)> <description>

# Example usages:
# (`pnpm log` is aliased to run this script in package.json)
#   - log.sh added "New feature description"
#   - log.sh fixed "sys" "Fixed a critical bug in the system"
#   - log.sh deprecated "old-sys" "Old system is now deprecated"
#   - log.sh removed "Removed obsolete feature"

args=("$@")

if [ $# -lt 2 ]; then
    echo "Usage: $0 <added|changed|deprecated|removed|fixed|security> <scope (optional)> <description>"
    exit 1
fi

type=${args[0]}
scope=""
description=""

if [[ "$type" == "added" || "$type" == "changed" || "$type" == "deprecated" || "$type" == "removed" || "$type" == "fixed" || "$type" == "security" ]]; then
    if [ $# -ge 3 ]; then
        scope=${args[1]}
        description="${args[@]:2}"
    else
        description="${args[@]:1}"
    fi
else
    echo "Invalid type. Must be one of: added, changed, deprecated, removed, fixed, security."
    exit 1
fi

if [ -n "$scope" ]; then
    autochange add -t "$type" -s "$scope" "$description"
else
    autochange add -t "$type" "$description"
fi
