FROM python:3.7



WORKDIR /usr/src/app

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list

RUN apt-get update

RUN wget http://archive.ubuntu.com/ubuntu/pool/main/g/glibc/multiarch-support_2.27-3ubuntu1.2_amd64.deb
RUN dpkg -i multiarch-support_2.27-3ubuntu1.2_amd64.deb

#Install mssql odbc driver
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17

RUN apt-get install -y unixodbc-dev
RUN apt-get install -y libgssapi-krb5-2

#Install FreeTDS and dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

#copy programs
COPY . .
EXPOSE 80

ENTRYPOINT ["python", "app.py"]
