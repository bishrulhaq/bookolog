#!/bin/bash

# Check the value of NODE_ENV environment variable
if [ "$APP_ENV" == "development" ]; then
  # Run development server
  npm run dev
else
  # Build the Next site including SSG
  npm run build

  # Start the production server
  npm run start
fi