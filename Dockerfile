FROM nginx
COPY --chmod=755 dist /usr/share/nginx/html

