## Install Nginx

```
sudo apt update
sudo apt install nginx
```

1. Build project

```
yarn
yarn build
```

2. Copy all build source to Nginx folder

`cp -r build/* /usr/share/nginx/html`

3. Configure Nginx by copy the configuration file to Nginx

```
sudo cp nginx/ebd.conf /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```
