# Typescript-Learning

Creating a Angular app to learn more about login authentication, web security and many other fields.

## Running Back-End:
1) Navigate to ./Typescript-Learning
2) If not already, run "python -m venv venv"
    - Might need to run "Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass" for security
3) Run ".\venv\Scripts\activate"
4) Navigate to the ./backend folder
5) Install any necessary Python programs
    - "pip install flask flask-limiter flask-cors bcrypt mysql-connector-python dotenv uuid PyJWT cryptography"
6) Run "python Server.js"

## Running Front-End:
1) Navigate to root folder
2) Run "npm start"
3) Open in the local browser

## .env Variable Setup
* For creating a secret key, run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
* Download MySQL and to set the database up

## To-Do:
* Create a login page
    * <s>Create a login page</s>
    * <s>Send login info to db</s>
    * <s>Add error message</s>
    * Add JWT tokens to handle user session
        * Create field to store UUID for user_id
    * <s>Create sign up page</s>
    * Add payment page
    * Add forgot password page
    *  Add email validation
    * Implement SSO
* Setup the initial user db
    * <s>Create initial db</s>
    * <s>Insert admin user</s>
    * <s>Create route for login</s>
    * <s>Add password hasing/salting</s>
    * <s>Add rate limiting</s>
    * Add sql injection checks
* Error Logging DB:
    * Add error logging db
    * Add error logging table
    * Find way to log errors in the table when exceptions are hit
* Page routing
    * <s>Route pages on one page</s>
    * Add auth for pages when not logged in
* Misc. 
    * Create admin settings
    * Switch to MySQL