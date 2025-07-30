
# cliamio backend

- project setup
    - npm init -y
    - installed dependencies - express, mongoose, dotenv,cors

    - index.js - the entry point for the server
        - configured environment variables.
        - instantiated express
        - raw http server using the app instance - for the socket io utilization
        - initialized server side socket connection
            - to facilitate real time leaderboard update

    - added environment variable that include
        - mongodb connection string to connect the database
        - port that defaults to 3000
        - cloudinary configurations - to be able upload profile pic, and get back a image url
            - name
            - api key
            - api secret
        
    - defined db models
        - User model - to store user details - primarily - username, profile pic, points, and createdAt
        - Claim model - to store past claims - userId(foreign key to user's table) points claimed, claimedAt

    - separate Database connection logic with proper error handling

    - used Multer middleware to facilitate file upload to cloudinary

    - finally import routes to index.js
        - /api/users (get) - controller to fetch all the existing users
        - /api/users/add (post) - to add a user to the db, simple - just username and profilePic(optional)

        - /api/claim (post) - controller to assign random points(1-10) to users, store it to db
        - /api/claim/history (get) - to fetch all the past claims
        
        - /api/leaderboard (get) - fetch all the users, sort in in decreasing order of their points, return leaderboard stats

        - finally, asyncronously connecting to database
        - start server to listen at the specified port