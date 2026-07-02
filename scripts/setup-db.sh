#!/bin/bash
# setup-db.sh - Script setup DB and Seed for Testing

echo "Setting up PostgreSQL Database using Prisma..."
cd ../services/shared-database || exit
npx prisma migrate dev --name init
echo "Prisma Migration Completed."

echo "Seeding PostgreSQL Database..."
npx ts-node prisma/seed.ts
echo "PostgreSQL Seed Completed."

echo "Setting up and seeding MongoDB Database..."
cd ../../scripts || exit
npm install mongodb --no-save
node mongo-init.js
echo "MongoDB Setup Completed."
