import bcrypt from "bcryptjs"

const users = [
    {
        name : 'Admin User',
        email : 'admin@example.com',
        password : bcrypt.hashSync('123456', 10),
        isAdmin : true
    },
    {
        name : 'Yashas',
        email : 'yashas@example.com',
        password : bcrypt.hashSync('123456', 10),
        isAdmin : false
    },
    {
        name : 'Priya',
        email : 'priya@example.com',
        password : bcrypt.hashSync('123456', 10),
        isAdmin : false
    }
]

export default users