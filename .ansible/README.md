# Ansible playbook

This ansible playbook installs docker and docker-compose, and it also downloads the repository and runs the app using docker compose. The playbook is written for Ubuntu.

## Quick guide

To deploy the app on a remote server, add the hostname or IP address of the server in the *inventory.ini* file, under the *servers* group.

```
ansible-playbook -i inventory.ini installation-playbook.yml