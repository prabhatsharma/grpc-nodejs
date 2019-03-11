var grpc = require("grpc")
var protoLoader = require('@grpc/proto-loader');

var PROTO_PATH = __dirname + '/person.proto';

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var person_proto = grpc.loadPackageDefinition(packageDefinition).person;

var people = [{
    uid: 1,
    firstname: "Prabhat",
    lastname: "Sharma"
}, {
    uid: 2,
    firstname: "Quinsika",
    lastname: "Sharma"
}]

// Implements GetPersonById RPC method
function getPersonById(call, callback) {
    var found = false;
    for (var i = 0; i < people.length; i++) {
        if (call.request.uid === people[i].uid) {
            callback(null, people[i]);
            found = true;
            break;
        }
    }
    if (found == false) {
        callback(null, {});
    }
}

function getPersons(call, callback) {
    callback(null, { persons: people });
}


/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    var serviceMapping = {
        getPersons: getPersons,
        getPersonById: getPersonById
    }

    server.addService(person_proto.PersonService.service, serviceMapping);

    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();