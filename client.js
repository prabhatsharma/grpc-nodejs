var PROTO_PATH = __dirname + '/person.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var person_proto = grpc.loadPackageDefinition(packageDefinition).person;

function main() {
    var client = new person_proto.PersonService('localhost:50051', grpc.credentials.createInsecure());

    var params = {
        uid: 2
    }

    client.getPersonById(params, (err, response)=>{ console.log(response) })
    client.getPersons({}, (err, response)=>{ console.log(response) })   
}

main();