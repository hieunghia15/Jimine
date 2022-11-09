var myDate = new Date();
var statuses = ["toDo", "inProgress", "done"];
var members = [
  {
    id: "A",
    name: "Nguyễn Văn A",
    img: "./img/Page/logo.png",
    email: "nva@gmail.com",
  },
  {
    id: "B",
    name: "Nguyễn Văn B",
    img: "./img/Page/logo.png",
    email: "nvb@gmail.com",
  },
  {
    id: "C",
    name: "Nguyễn Văn C",
    img: "./img/Page/logo.png",
    email: "nvc@gmail.com",
  },
  {
    id: "D",
    name: "Nguyễn Văn D",
    img: "./img/Page/logo.png",
    email: "nvd@gmail.com",
  },
  {
    id: "E",
    name: "Nguyễn Văn E",
    img: "./img/Page/logo.png",
    email: "nve@gmail.com",
  },
];

var randomTasks = []
for(var i = 1; i <= 1000; i++) {
    randomTasks.push(
        {
            id: "JM-" + i,
            content: "aaa",
            status: statuses[Math.floor(Math.random() * 3)],
            assignee: {
                id: i,
                name: members[Math.floor(Math.random() * 5)].name,
                img: "./img/Page/logo.png",
                email: "nva@gmail.com"
                },
            createAt: new Date(myDate.getFullYear(), 
            myDate.getMonth() - Math.floor(Math.random() * 17), 
            myDate.getDate() - Math.floor(Math.random() * 31))
        }
    )
}

var projectData = {
    id: "Jimine123",
    name: "JIMINE",
    createAt: new Date(myDate.getFullYear() - 1, 1, 1),
    leader: {
        id: "A",
        name: "Nguyễn Văn A",
        img: "./img/Page/logo.png",
        email: "nva@gmail.com"
    },
    members: members.filter(member => member.id !== "A"),
    tasks: randomTasks
};

export {projectData}