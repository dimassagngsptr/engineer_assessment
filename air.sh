#!/bin/sh

# Run air init if .air.toml does not exist
if [ ! -f ".air.toml" ]; then
  echo "Initializing air configuration..."
  air init
fi

# Start air
air
