FROM node:20-alpine AS build

WORKDIR /app
COPY frontend-app/package*.json ./
RUN npm install
COPY frontend-app ./
RUN npm run build

FROM nginx:alpine
# Copy the built React app to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration
COPY gateway-frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
