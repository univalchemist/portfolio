# Porfolio
My Portfolio page

## Configuration

  - Install nginx on the server
    ```bash
    $ sudo apt-get update
    $ sudo apt-get install nginx
    $ nginx -v
    $ sudo systemctl status nginx
    $ sudo systemctl enable nginx
    $ sudo systemctl reload nginx
    $ sudo ufw allow 'nginx http'
    $ sudo ufw reload
    $ sudo ufw allow 'nginx https'
    $ sudo ufw allow 'nginx full'
    ```
    Copy the content of `nginx/default.server.conf` to nginx default configuration of the server

  - Install docker, docker-compose on the server
    ```bash
    $ sudo apt update
    $ sudo apt install apt-transport-https ca-certificates curl software-properties-common
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
    $ apt-cache policy docker-ce
    $ sudo apt install docker-ce
    $ sudo systemctl status docker
    $ sudo usermod -a -G docker ubuntu
    $ sudo apt install docker-compose
    $ sudo systemctl restart docker
    ```
    Restart docker and reconnect ssh

### Useful commands

```bash
$ sudo kill `sudo lsof -t -i:9001`
```

```bash
$ docker system prune -a
```

```bash
docker-compose up --build -d
```

### Troubleshooting

`could not find an available, non-overlapping IPv4 address pool among the defaults to assign to the network`

```bash
$ docker network rm $(docker network ls | grep "bridge" | awk '/ / { print $1 }')
$ sudo systemctl restart docker
```

### Connect to mongo db from outside.
  `mongodb://[username]:[password]@[host]:[port]/portfolio?authSource=admin`

### Initial data
  Copy this document to `admins` collection.
```nash
  {
    "_id":
      {
        "$oid":"61bda98096ce67ddacb5b183"
      }
    "type":"SuperAdmin"
    "password":"$2a$13$n7YJknvCfDgQxjYBKrBHJeLum/08VkmyKyb9NdWUOo1rP0/F8v1Fe",
    "email":"fatpig0416@gmail.com",
    "createdAt":
      {
        "$date":"2021-12-18T09:27:28.011Z"
      },
    "updatedAt":
      {
        "$date":"2022-03-19T12:34:23.782Z"
      },
    "__v":0,
    "tgChatId":"1970324717"
  }
```

`Test account: fatpig04162@gmail.com/caixia0416`
