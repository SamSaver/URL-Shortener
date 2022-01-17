# Welcome to URL-Shortener!

Hi! I'm **Samarth Singh Pawar (11941060)**. This is our group's (Group 10) implementation (Aayush Deshmukh [11940010], Jampa Rajesh Kumar [11940530]) of URL shortener made with Node JS. In this readme you can know about how to run this node app on your system as well as how to make api calls to this **LIVE node app** from your terminal.

# API CALLS

## SIGNING UP A USER (If the user is visiting for the first time)

> curl -X POST http://18.206.223.141:8080/api/auth/signup -H 'Content-Type: application/json' -d '{"email":"\<EMAIL>","password":"\<PASSWORD>"}'
-  Eg: If user email address is [samarths@iitbhilai.ac.in](mailto:samarths@iitbhilai.ac.in) and his password is my_hard_password then the command will be:

> curl -X POST [http://18.206.223.141:8080/api/auth/signup](http://18.206.223.141:8080/api/auth/signup) -H ‘Content-Type: application/json’ -d ‘{“email”: “[samarths@iitbhilai.ac.in](mailto:samarths@iitbhilai.ac.in)”, “password”: “my_hard_password”}’

This will return a JWT Token (API DEV KEY)

## LOGIN FOR A USER (If you are an existing user)
> curl -X GET http://18.206.223.141:8080/api/auth/login -H 'Content-Type: application/json' -d '{"email":"\<EMAIL>","password":"\<PASSWORD>"}'
- Eg: If user email address is [samarths@iitbhilai.ac.in](mailto:samarths@iitbhilai.ac.in) and his password is my_hard_password then the command will be:
> curl -X POST [http://18.206.223.141:8080/api/auth/signup](http://18.206.223.141:8080/api/auth/signup) -H ‘Content-Type: application/json’ -d ‘{“email”: “[samarths@iitbhilai.ac.in](mailto:samarths@iitbhilai.ac.in)”, “password”: “my_hard_password”}’

## TO CREATE URL

> curl -X POST http://18.206.223.141:8080/api/getShortUrl -H 'Content-Type: application/json' -H 'Authorization: Bearer \<TOKEN>' -d '{"full_url":"\<FULL_URL>","custom_alias":"\<CUSTOM_ALIAS>" [OPTIONAL],"user_name":"\<USER_NAME>" [OPTIONAL],"expire_at":"\<EXPIRE_AT>" [OPTIONAL]}'
- Eg: If user TOKEN is abc123erf, FULL_URL is http://very-big-link.com, EXPIRE_AT is 23 Mar, 2022, then the command will be:

> curl -X POST http://18.206.223.141:8080/api/getShortUrl -H 'Content-Type: application/json' -H 'Authorization: Bearer abc123erf' -d '{"full_url":"http://very-big-link.com","expire_at":"23 Mar, 2022"}'

**Note:** Expiry Date Nomenclature = \<Date> \<MONTH>, \<YEAR>

## TO DELETE URL

> curl -X POST http://18.206.223.141:8080/api/deleteURL -H 'Content-Type: application/json' -H 'Authorization: Bearer \<TOKEN>' -d '{"short_url":"\<SHORT_PART_OF_URL>"}'

- Eg: If user TOKEN is abc123erf, and short_url is zxcqwr23a (original link was:
[http://18.206.223.141:8080/zxcqwr23a](http://18.206.223.141:8080/zxcqwr23a)), then the command will be:

> curl -X POST http://18.206.223.141:8080/api/deleteURL -H
'Content-Type:application/json' -H 'Authorization: Bearer abc123erf' -d
'{"short_url":"zxcqwr23a"}'

## Install on your own system
### Follow the following steps:
- cd to the project directory. (Make sure you have nodejs installed on your system)
- npm install

- In the code files change the _18.206.223.141:8080_ to _localhost:8080_ so that the project runs on your localhost.
- node server.js
```