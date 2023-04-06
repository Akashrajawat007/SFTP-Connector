# SFTP-Connector
The SFTP Connector is a web application that allows users to connect to and manage files on a remote SFTP server. It consists of a frontend built with **ReactJS** and a backend built with **NodeJS**. Users can input their SFTP server credentials and connect to the server, view and manage the files on the server.

The project utilizes the [ssh2-sftp-client](https://github.com/theophilusx/ssh2-sftp-client) package to handle the SFTP connection and file management operations. The frontend is designed with a clean and modern UI using Material UI components and allows users to easily navigate and perform various file management tasks. The backend follows the API-first approach and provides a RESTful API to handle client requests and responses.

This project is useful for anyone who needs to connect to and manage files on a remote SFTP server, such as web developers, software engineers, and system administrators. It is also a great learning resource for those interested in building web applications with ReactJS and NodeJS.


# Folder structure
The folder structure of this project is as follows:
```
project/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── config.js
│   └── package.json
├── package.json
└── package-lock.json
``` 
  
# Naming conventions
To ensure consistency and readability in our code, this project follows these naming conventions:

### Folders
- Folder names are in lowercase and separated by hyphens (kebab-case)
- Folders are named after their respective module or feature
- Example: sftp-connector
### Variables
- Variable names are in camelCase
- Descriptive variable names are used
- Constants are in uppercase and separated by underscores (UPPERCASE_SNAKE_CASE)
- Example: const PORT_NUMBER = 3000;
### Functions/Methods
- Function and method names are in camelCase
- Descriptive function and method names are used
- Functions and methods are named after their respective actions or tasks
- Example: connectToSftpServer()
### API Endpoints
- API endpoint names are in lowercase and separated by hyphens (kebab-case)
- Descriptive endpoint names are used
- Endpoints are named after the resource they handle
- Example: /sftp-connector/connect
### Components
- Component names are in PascalCase
- Descriptive component names are used
- Component names are named after their respective purpose
- Example: SftpFileList
### CSS
- CSS class names are in lowercase and separated by hyphens (kebab-case)
- Descriptive class names are used
- Class names are named after their respective purpose
- Example: file-list-container

By following these naming conventions, the codebase will be consistent and easy to read and maintain.
