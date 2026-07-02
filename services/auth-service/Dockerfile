FROM node:20-alpine

WORKDIR /app

# Copy shared-database
COPY services/shared-database ./services/shared-database

# Copy service package files
COPY services/auth-service/package*.json ./services/auth-service/

# Install shared-database deps
WORKDIR /app/services/shared-database
RUN npm install
RUN npx prisma generate

# Install service deps
WORKDIR /app/services/auth-service
RUN npm install

# Copy service source code
COPY services/auth-service .

# Build service
RUN npm run build

# Set env port to 3000 to match standard dockerized exposed port, or keep it original. 
# We'll just run start:prod.
CMD ["npm", "run", "start:prod"]
