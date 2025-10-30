# MonkeyMonie

Creating a Angular app to learn more about login authentication, web security and many other areas.

## Running Back-End:
1) Navigate to ./Typescript-Learning
2) If not already, run "python -m venv venv"
    - Might need to run "Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass" for security
3) Run ".\venv\Scripts\activate"
4) Navigate to the ./backend folder
5) Install any necessary Python programs
    - "pip install flask flask-limiter flask-cors bcrypt mysql-connector-python dotenv uuid PyJWT cryptography"
6) Run "python Server.py"

## Running Front-End:
1) Navigate to root folder
2) Run "npm start" (assuming node.js is installed. If not, install here https://nodejs.org/en)
    - run "ng serve" to run development (environment.ts)
    - run "ng build --prod" to run for production (environment.prod.ts)
3) Additional packages may need to be installed
4) Open in the local browser

## .env Variable Setup:
* For creating a secret key, run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
* Download MySQL and to set the database up

## Publishing Changes to Live Site:
* Setup firebase
    * npm install -g firebase-tools
* firebase login
* npm run build
* firebase deploy
* You can preview changes with:
    - firebase hosting:channel:deploy preview_name

## To-Do:
* Create a login page
    * <s>Create a login page</s>
    * <s>Send login info to db</s>
    * <s>Add error message</s>
    * <s>Add JWT tokens to handle user session</s>
        * <s>Create field to store UUID for user_id</s>
    * <s>Create sign up page</s>
    * Add payment page
    * Add forgot password page
    * <s>Create email svc with Postmark</s>
    * Add email validation
    * Implement SSO
* Setup the initial user db
    * Database design:
        * https://drawsql.app/teams/monkeymoney/diagrams/monkey-money
    * <s>Create initial db</s>
    * <s>Insert admin user</s>
    * <s>Create route for login</s>
    * <s>Add password hasing/salting</s>
    * <s>Add rate limiting</s>
    * <s>Add sql injection checks</s>
    * <s>Add AccountHistory table</s>
    * Add indexing to some tables (not sure which tables yet)
* Overview page
    * Grab currnet user accounts
* Account page
    * User can account personal/taxable
    * User can delete account personal/taxable
    * User can hide/show account personal/taxable
* Error Logging DB:
    * <s>Add error logging table</s>
    * Find way to log errors in the table when exceptions are hit
* Page routing
    * <s>Route pages on one page</s>
    * <s>Add auth for pages when not logged in</s>
    * <s>Add auth for admin pages</s>
* Misc. 
    * <s>Switch to MySQL</s>
    * <s>Inject GA4</s>
    * Create admin settings
    * Ability to generate a pdf