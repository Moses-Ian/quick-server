const db = name => 
`drop database if exists ${name};
create database ${name};
use ${name};`;

module.exports = db;
