FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY dist/frontend/ /usr/share/nginx/html
COPY .htaccess /usr/share/nginx/html
