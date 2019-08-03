FROM nginx:alpine
WORKDIR /usr/share/nginx/html
ADD ./dist/cct-garage-frontend .