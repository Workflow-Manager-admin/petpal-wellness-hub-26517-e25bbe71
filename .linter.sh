#!/bin/bash
cd /home/kavia/workspace/code-generation/petpal-wellness-hub-26517-e25bbe71/petpal_wellness_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

