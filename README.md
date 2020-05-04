# Member registration 

This repo handles new member registration, owee registration and payments for registrations. It uses github.com/WISVCH/payments for payments handling.

## Set up
 1. Install golang https://golang.org/doc/install
 2. Open go with your prefered IDE
 3. Install the dependencies through your IDE or call `go mod install` in the project root
 4. Create a postgres database and set the corresponding `DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS` value such that the code can access your database
 5. Set the `ALLOWEDLDAP` value to your corresponding ch connect ldap group. https://connect.ch.tudelft.nl/manage/user/profile
 
