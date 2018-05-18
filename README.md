# Digital preservation assignment 1 - 2

## Description
The second part of the digital preservation exercise.

# Reproducability

## Backend

The bootable jar is needed for docker to build successfully. This can be done with the gradle task:
```shell
./gradlew bootJar
  ```
This adds a .jar under the build/libs folder which then is used as a docker dependency. Unfortunately we were not able to include the docker script in the backend build.

## Frontend

No special requirements needed, docker installs all dependencies.

# Docker Compose

If the backend has been built successfully you can run:

```shell
docker-compose up
  ```
  
This starts the backend (port 8080)and frontend (port 4200) which you can then access on localhost:4200

# Contributers
* [Michael Sober](https://orcid.org/0000-0002-9612-9022) <a href="https://orcid.org/0000-0002-9612-9022" target="orcid.widget" rel="noopener noreferrer" style="vertical-align:top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon">orcid.org/0000-0002-9612-9022</a>
* [Lukas Kathrein](https://orcid.org/0000-0001-5523-9383) <a href="https://orcid.org/0000-0001-5523-9383" target="orcid.widget" rel="noopener noreferrer" style="vertical-align:top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon">orcid.org/0000-0001-5523-9383</a>

## LICENCE
Copyright 2018 Lukas Kathrein, Michael Sober

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
