# Dockerfile for serving static terms markdown files
FROM nginx:alpine

# Copy static files to nginx html folder
COPY . /usr/share/nginx/html

# Expose default HTTP port
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
