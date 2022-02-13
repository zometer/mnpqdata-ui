FROM nginx:1.21.6-alpine
ENV NODE_ENV production

COPY docker-entrypoint.d/ /docker-entrypoint.d/
COPY build/ /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]