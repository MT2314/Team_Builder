const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Console } = require("console");

const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);


let engineersCount = 0;
let managersCount = 0;
let internsCount = 0;
const employeeNum = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "engineers",
                message: "How many Engineers in the team?"
            },
            {
                type: "input",
                name: "managers",
                message: "How many Managers in the team?"
            },
            {
                type: "input",
                name: "interns",
                message: "How many Interns in the team?"
            },
        ])
        .then((data) => {
            engineersCount = data.engineers;
            managersCount = data.managers;
            internsCount = data.interns;
            if (engineersCount > 0) {

                engineerBuild()
            }
            else if (managersCount > 0) {
                managersBuild()
            }
            else if (internsCount > 0) {
                internBuild()
            }
            else {
                console.log("Must have atleast 1 person in team")
                employeeNum();
            }

        });
};

let engineers = [];
let eCount = 1;
const engineerBuild = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is their id number??",
        },
        {
            type: "input",
            name: "email",
            message: "What is their email address?",
        },
        {
            type: "input",
            name: "github",
            message: "What is your github?",
        },
    ])
        .then((data) => {
            engineers.push(new Engineer(data.name, data.id, data.email, data.github));
            console.log(engineers);
        })
        .then((data) => {
            if (eCount > engineersCount - 1) {
                if (managersCount > 0) {
                    managersBuild()
                }
                else {
                    internBuild()
                }
            }
            else {
                eCount++;
                engineerBuild()
            }
        })
};
let managers = [];
let mCount = 1;
const managersBuild = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is their id number??",
        },
        {
            type: "input",
            name: "email",
            message: "What is their email address?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?",
        },
    ])
        .then((data) => {
            managers.push(new Manager(data.name, data.id, data.email, data.officeNumber));
            console.log(engineers);
            console.log(managers);
        })
        .then((data) => {
            if (mCount > managersCount - 1) {
                if (internsCount > 0) {
                    internsBuild()
                }
                else {
                    console.log("done");
                }
            }
            else {
                mCount++;
                managersBuild()
            }
        })
};
let interns = [];
iCount = 1;
const internsBuild = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the interns's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is their id number??",
        },
        {
            type: "input",
            name: "email",
            message: "What is their email address?",
        },
        {
            type: "input",
            name: "school",
            message: "What is school do you go to?",
        },
    ])
        .then((data) => {
            interns.push(new Intern(data.name, data.id, data.email, data.school));
            console.log(engineers);
            console.log(managers);
            console.log(interns);
        })
        .then((data) => {
            if (iCount > internsCount - 1) {
                console.log("interns are good");
                joinTeam(engineers, managers, interns);
            }
            else {
                iCount++;
                internsBuild()
            }
        })
};


const joinTeam = (engineers, managers, interns) => {
    const teamMembers = [...engineers, ...managers, ...interns];
    console.log(teamMembers);
    display(teamMembers);
};

const display = (teamMembers) => {
    let renderedHTML = render(teamMembers);
    fs.writeFile(outputPath, renderedHTML, function (err, result) {
        if (err) {
            console.log('error', err);
        };
    });

};

employeeNum();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
