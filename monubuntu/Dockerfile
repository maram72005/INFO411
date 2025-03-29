# Start your image with a node base image
FROM ubuntu

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN apt update && \
    apt upgrade -y && \
    apt install -y nano \
    vim nano git links curl wget telnet dnsutils iproute2 net-tools mysql-client

# Start the app using serve command
CMD [ "tail", "-f", "/dev/null" ]