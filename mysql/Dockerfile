FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=nodedb

COPY init.sql /docker-entrypoint-initdb.d/
