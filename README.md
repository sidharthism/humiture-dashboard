# humiture-dashboard
A unified dashboard for monitoring humidity and temperature

#### Instructions for running backend/server locally
1. Clone this repo
2. In /humiture-dashboard make a virtual environment (`virtialenv <env name>`) [Install virtualenv by `pip install virtualenv`]
3. Activate the virtial environment (`.\<env name>\Scripts\activate`)
4. Install the necessary dependencies by executing `pip install -r requirements.txt`
5. The database can be either a local MongoDB instance or an atlas instance. Create a .env file in /humiture-dashboard/server and specify the required config ( Check settings.py in /humiture-dashboard/server/server)
6. In /humiture-dashboard/server run `python manage.py makemigrations` and `python manage.py migrate`
7. [Optional] Create a django admin by running `python manage.py createsuperuser`
8. Run `python manage.py runserver` - Starts server on port 8000

#### Instructions for running frontend/client locally
1. In /humiture-dashboard/client/humiture-client run `npm install` [Requires node and npm to be installed]
2. By default the client is configured to run on the cloud MongoDB instance. To change it to a local instance edit the API_ROOT value in /humiture-dashboard/client/humiture-client/src/api/config.js
3. In /humiture-dashboard/client/humiture-client run `npm start` - Starts client on port 3000
