FROM xzesstence/ubuntu-apache
MAINTAINER xzesstence <xzesstence@gmail.com>

COPY dist /var/www/html

# Copy the entrypoint into the build
COPY entrypoint.sh /root/entrypoint.sh
# Make sure it is executable
RUN chmod +x /root/entrypoint.sh

CMD bash -C '/root/entrypoint.sh';'bash'

EXPOSE 80