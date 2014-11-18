
Installation steps for Ubuntu 14.04
===================================

Those steps describe all the steps required to setup Kogo application from very begining(fresh installation of ubuntu).

Prerequisities
--------------

GCC compiler and other packages are required to install node - run following command to install those:

```
sudo apt-get install build-essential
```

Nodejs installation
-------------------

- go to http://nodejs.org/ website
- click on "Install" button to download newest NodeJS version
- unpack the archive
- cd into unpacked directory
- run following
```
./configure
make
sudo make install
```

check the installation:

```
node --version
```

Git installation
----------------

```
sudo apt-get install git
```

MySQL installation
----------------

```
sudo apt-get install mysql-server-5.5
```

Getting source code
-------------------

Clone Kogo repository:

```
git clone https://github.com/HedonSoftware/Kogo.git kogo
```

Clone Cerberus repository:

```
git clone https://github.com/HedonSoftware/Cerberus-API.git cerberus-api
```

Setting up Cerberus App
-----------------------

Install all project's dependencies:

```
npm install
```

modify /config/app.json config file contain correct database details:
mysql->host
mysql->user
mysql->password

setup database:

```
export NODE_ENV=app && node build/setupDb.js

// or export NODE_ENV=app && node build/setupDb.js test-sql
// to init project with sample data
```

create logs directory:

```
mkdir logs
```

and start node server:

```
node app.js
```

Setting up Kogo App
-------------------

Install all project's dependencies:

```
npm install
```

Install bower package:

```
sudo npm install -g bower
```

Install all bower's dependencies:

```
bower install
```

create logs directory:

```
mkdir logs
```

and start node server:

```
export NODE_ENV=production && node app.js
```

Setting up KogoAdmin App
------------------------

Install all project's dependencies:

```
npm install
```

Install all bower's dependencies:

```
bower install
```

create logs directory:

```
mkdir logs
```

and start node server:

```
export NODE_ENV=production && node app.js
```

Symlink static assets of Kogo & KogoAdmin
-----------------------------------------

Inside Kogo root directory:

```
mkdir -p public/images/avatars
```

Inside KogoAdmin root directory:

```
cd public/images
ln -s ./../../../kogo/public/images/avatars avatars
```

Ngnix installation
------------------

Note: Nginx is used as a proxy to serve static files or forward requests upstream to Node.js. Node.js also implements fallback mechanism to serve static files just in case if Nginx wouldn't be setup. This means that for quick checks you can skip this step and use localhost:PORT combination(default port for Kogo is 3002, KogoAdmin - 3003).

```
sudo apt-get install nginx
```

Setup Nginx to handle all public files and forward request to NodeJS when file doesn't exist.
Sample file was added to repository under /resources/nginx/config (please remember about change in paths!).

Redis installation
----------------

```
sudo apt-get install redis-server
```
