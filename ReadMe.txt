Signup for a user
curl -X POST http://localhost:5000/api/auth/signup -H 'Content-Type: application/json' -d '{"email":"samarths@iitbhilai.ac.in","password":"samarth"}' 

We get a token after signing up

Login for a user
curl -X GET http://localhost:5000/api/auth/login -H 'Content-Type: application/json' -d '{"email":"samarths@iitbhilai.ac.in","password":"samarth"}'

We get the token for the corresponding user

After getting the token, use the token as given below for any post request to the url shortener
curl -X POST http://localhost:5000/api/getShortUrl -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoic2FtYXJ0aHNAaWl0YmhpbGFpLmFjLmluIiwicGFzc3dvcmQiOiIkMmIkMTAkQVNBYzdKQ1FFM3dveTA4ZHhEN2cxdVpxUExFQkpkY0dYUlNoWk5KZHNLODJJc3kyU1ZWUDIiLCJfaWQiOiI2MWU0MzJjY2ZlYzVkNzgwMjFiZjIzNDAiLCJfX3YiOjB9LCJpYXQiOjE2NDIzNDUxNjQsImV4cCI6MTY0MjQzMTU2NH0.xeFxwjCuCRtRgCf3aocq3MQsAaZ42k4kYTBr_qLKB0k' -d '{"full_url":"https://www.google.com/","custom_alias":"toddler"}'