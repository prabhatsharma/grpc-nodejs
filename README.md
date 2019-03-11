# grpc sample project

This project creates a nodejs grpc server and a client.

Server has 2 rpc methods:

```proto
rpc getPersonById(PersonRequest) returns (Person);
rpc getPersons(PersonsRequest) returns (Persons);
```

Client will call both the methods and server will respond with dummy data for both the requests.


# Installation

1. clone the repo
1. npm install

# server start

> node server.js

# Client start

> node client.js

