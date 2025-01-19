## REQUIREMENTS

- Create an API supporting a 3-role user system (e.g., Admin, User, Guest).
- Implement endpoints for user registration, login, and profile/dashboard management.
- Ensure proper authentication (e.g., using tokens) and validation.


### FEATURES
#### User
- Each user has a list of task, with dates
- They can be marked as completed, made public or private, CRUD 
- A profile that contains their first & last name, a generated username & social media links (opt): insta, linkedin, github, twitter
- All details in profile are edittable, new username if available

#### Guest 
- Can view user profiles & tasks

#### Admin
- Create & delete users
- Change peoples password - send email of a temp changed password
- Ban users

#### Auth
- Login 
- Register 
- Forgot password 
- Change password
- Email Verification

### Endpoints
- /auth/login
- /auth/register
- /auth/forgot-password
- /auth/reset-password
- /auth/verify?=
- /admin/user (GET, POST, DELETE)
- /admin/user/:id/ban (POST)
- /admin/user/:id/change-password (POST)
- /user/:username  (guests: [GET]; user: [POST, PATCH, DELETE])
- /user/:username/tasks  (guests: [GET]; user: [POST, PATCH, DELETE])

### 
### Data Models

#### Task
```json
{
    "id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "string (ISO 8601 format)",
    "completed": "boolean",
    "public": "boolean",
    "createdAt": "string (ISO 8601 format)",
    "updatedAt": "string (ISO 8601 format)",
    "userId": "string",
}
```

#### User Profile
```json
{
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "password": "string",
    "socialMediaLinks": {
        "instagram": "string (optional)",
        "linkedin": "string (optional)",
        "github": "string (optional)",
        "twitter": "string (optional)"
    },
    "createdAt": "string (ISO 8601 format)",
    "updatedAt": "string (ISO 8601 format)"
}
```