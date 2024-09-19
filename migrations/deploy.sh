#!/bin/bash

# Load environment variables from the .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found"
  exit 1
fi

# Run the SQL migrations
for migration in $(ls ./*.sql | sort); do
  echo "Running migration: $migration"
  mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < $migration

  if [ $? -eq 0 ]; then
    echo "Successfully applied migration: $migration"
  else
    echo "Failed to apply migration: $migration"
    exit 1
  fi
done

echo "All migrations applied successfully."
