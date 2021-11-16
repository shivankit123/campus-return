require('dotenv').config()
const mysql = require('mysql2')

const db_config = {
    host: process.env.AZURE_SERVER_DB_HOST,
    user: process.env.AZURE_SERVER_DB_USER,
    database: process.env.AZURE_SERVER_DB,
    password:process.env.AZURE_SERVER_DB_PASSWORD,
    multipleStatements: true
}

let db = mysql.createConnection(db_config)


let createStudent = "create table if not exists student" +
                    "(student_roll_number varchar(20) primary key,"+
                    "student_name varchar(50),"+
                    "student_branch varchar(60),"+
                    "student_email_id varchar(60),"+
                    "student_password varchar(150),"+
                    "student_yearofgrad int,"+
                    "student_programme varchar(20)," + 
                    "student_token varchar(150)," +
                    "student_verified_status tinyint(1));";

let createRTPCR =   "create table if not exists rtpcr" +
                    "(Rtpcr_id varchar(75) primary key," +
                    "FD_Document mediumblob, "+
                    "student_roll_number varchar(20)," +
                    "constraint has_report_of " +
                    "foreign key(student_roll_number)"+
                    "references student(student_roll_number)"+
                    "on update cascade "+
                    "on delete cascade);"

let createApplication = "create table if not exists Application" +
                    "(Application_id int(11) primary key auto_increment,"+
                    "Application_status char(1) not null,"+
                    "student_roll_number varchar(20) not null,"+
                    "constraint applied_by "+
                    "foreign key(student_roll_number)"+
                    "references student(student_roll_number)"+
                    "on update cascade "+
                    "on delete cascade);"

let createFirstDose = "create table if not exists First_Dose" +
                    "(Fdose_id varchar(75) primary key,"+
                    "FD_Document mediumblob, "+
                    "student_roll_number varchar(20),"+
                    "constraint certificate_of "+
                    "foreign key(student_roll_number)"+
                    "references student(student_roll_number)"+
                    "on update cascade "+
                    "on delete cascade);"

let createSecondDose = "create table if not exists Second_dose"+
                    "(Sdose_id varchar(75) primary key,"+
                    "FD_Document mediumblob, "+
                    "student_roll_number varchar(20),"+
                    "constraint sd_certificate_of "+
                    "foreign key (student_roll_number)"+
                    "references student (student_roll_number)"+
                    "on update cascade "+
                    "on delete  cascade);"

db.promise().query(createStudent+createApplication+createRTPCR+createFirstDose+createSecondDose)
    .then(result=>{
        console.log('Tables created,' , result);
    })
    .catch(err=>{
        console.log('Error in creating student table ', err);
    })

    
setInterval(function () {
    db.query("Select 1");
}, 5000);

module.exports = db;