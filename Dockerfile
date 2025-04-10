# Start your image with an already existing apache image
FROM php:8.3-apache

# Install node packages, install serve, build the app, and remove dependencies at the end
 

#RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

RUN apt update && \
    apt upgrade -y && \
    apt install -y nano \
    vim nano git links curl telnet wget

RUN docker-php-ext-install mysqli pdo pdo_mysql

# The /var/www directory should act as the main application directory
WORKDIR /var/www/html

# Cloning the git repository in html
# RUN git clone https://github.com/maram72005/INFO411 html

COPY . .

# Set port 80 for apache server
EXPOSE 80
