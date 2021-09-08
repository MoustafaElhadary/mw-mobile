![alt text](assets/images/logo_02.png)

# Recommendations Made Simpler

Did you just move to a new city? trying to meet new people? find things to do? find the best sushi place in town? or maybe you car broke down and are looking for a good mechanic!
<br /> <br/>
### Think Borat shout outs but better (*not sure how yet*)

![alt text](readme/13.png)


## Getting started

1. Clone this repository

   ```bash
   git clone https://github.com/MoustafaElhadary/intros.git
   ```

2. Install dependencies

      ```bash
      yarn install
      ```
3. Create a **.env** file for the firebase config

    ```env
    API_KEY=XXXX
    AUTH_DOMAIN=XXXX
    PROJECT_ID=XXXX
    STORAGE_BUCKET=XXXX
    MESSAGING_SENDER_ID=XXXX
    APP_ID=XXXX
    ```
4. run 

      ```bash
      yarn start
      ```


## Todo

### Auth

- [x] login
- [x] log out
- [ ] sign up
  - [x] sign up with email and password
  - [ ] flow to collect other data (image, first and last name, location and phone)
- [x] persist user

### Home page

- [ ] list of posts
  - [ ] a post has a user name, image, date, user karma, question and action
- [ ] post button to open modal to enter text
- [ ] search textbox

### Messages page

- [ ] list of messages
- [ ] post button to search for friends and start new chat

### Message page

- [ ] message name in the top ( user name or users name), max participants is 3
- [ ] list of messages
- [ ] if clicked on profile image, it will take you to user page

### User page

- [ ] list of updates
- [ ] karma indicator
- [ ] profile  pic
- [ ] bio
- [ ] location
- [ ] stats? (Moustafa has a strong network in Erie, and Pittsburgh, recommendations are mostly about food, etc..)

### App level

- [x] convert to typescript
