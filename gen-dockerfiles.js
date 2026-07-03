const fs = require('fs');
const path = require('path');

const services = [
  'auth-service',
  'unit-service',
  'activity-service',
  'attendance-service',
  'proof-service',
  'application-service',
  'notification-service'
];

services.forEach(service => {
  const dockerfileContent = `FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Copy shared-database
COPY services/shared-database ./services/shared-database

# Copy service package files
COPY services/${service}/package*.json ./services/${service}/

# Install shared-database deps
WORKDIR /app/services/shared-database
RUN npm install
RUN npx prisma generate

# Install service deps
WORKDIR /app/services/${service}
RUN npm install

# Copy service source code
COPY services/${service} .

# Build service
RUN npm run build

# Set env port to 3000 to match standard dockerized exposed port, or keep it original. 
# We'll just run start:prod.
CMD ["npm", "run", "start:prod"]
`;

  fs.writeFileSync(path.join(__dirname, 'services', service, 'Dockerfile'), dockerfileContent);
  console.log(`Created Dockerfile for ${service}`);
});
