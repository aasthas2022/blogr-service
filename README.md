# Blogr Service

This repository contains the source code for a backend application built with Node.js, Express, MongoDB, and Mongoose. The application manages blogs and users. This README provides detailed information about the project, how to set it up, and an overview of the available API endpoints.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)

2. [API Documentation](#api-documentation)
   - [Livecheck](#livecheck)
   - [Add a Blog](#add-a-blog)
   - [Add a User](#add-a-user)
   - [List Blogs with Pagination](#list-blogs-with-pagination)
   - [Get Blogs by Tags](#get-blogs-by-tags)
   - [Update Blog by ID](#update-blog-by-id)

3. [TODO (Future Scope)](#todo-future-scope)

---

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- Node.js
- MongoDB

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/aasthas2022/blogr-service
   ```

2. Change into the project directory:

   ```bash
   cd blogr-service
   ```

3. Install project dependencies using npm:

   ```bash
   npm install
   ```

### Running the Application

To start the application, use the following command:

```bash
npm run start
```

The application will be accessible at `http://localhost:3000` by default, unless you specify a different port using the `PORT` environment variable.

---

## API Documentation

The following section provides detailed information about the available API endpoints and their usage.

### Livecheck

#### Endpoint

- **GET** `/livecheck`

#### Description

- This endpoint is used for basic server status checking.

#### Example

- Request:

  ```http
  GET /livecheck
  ```

- Response:

  ```json
  {
    "message": "Running!"
  }
  ```
- Sample Screenshot for easier visualization:
    - ![livecheck](ImagesForReadme.md/livecheck.png 'GET /livecheck')

### Add a Blog

#### Endpoint

- **POST** `/api/blogs`

#### Description

- This endpoint allows you to add a new blog to the database.

#### Request Body

- The request body should contain the following fields:

  - `title` (string): The title of the blog.
  - `sub_title` (string): A subtitle for the blog.
  - `content` (string): The content of the blog.
  - `slug` (string): A unique slug for the blog.
  - `tags` (array of strings): Tags associated with the blog.
  - `author` (object): The author of the blog, with the following fields:
    - `first_name` (string): First name of the author.
    - `last_name` (string): Last name of the author.
    - `bio` (string): Author's bio.
    - `profile_pic_url` (string): URL to the author's profile picture.

#### Example

- Request:

  ```http
  POST /api/blogs
  ```

  Request Body:

  ```json
  {
    "title": "Example Blog Post",
    "sub_title": "A Subtitle for the Example Blog Post",
    "content": "Test Content",
    "slug": "example-blog-post",
    "tags": ["example", "blog", "post"],
    "author": {
      "first_name": "John",
      "last_name": "Doe",
      "bio": "A passionate blogger",
      "profile_pic_url": "https://example.com/profile-pic.jpg"
    }
  }
  ```

- Response:

  ```json
  {
    "_id": "unique-blog-id",
    "title": "Example Blog Post",
    "sub_title": "A Subtitle for the Example Blog Post",
    "content": "Test Content",
    "slug": "example-blog-post",
    "tags": ["example", "blog", "post"],
    "author": {
      "first_name": "John",
      "last_name": "Doe",
      "bio": "A passionate blogger",
      "profile_pic_url": "https://example.com/profile-pic.jpg"
    },
    "created_date": "timestamp",
    "modified_date": "timestamp",
    "__v": 0
  }
  ```
- Sample Screenshot for easier visualization:
    
    - ![/api/blogs](ImagesForReadme.md/post_blog_sucessful.png 'POST /api/blogs sucess')

    - ![/api/blogs](ImagesForReadme.md/post_blog_sucessful_mongodb.png '/api/blogs success mongodbview')


### Add a User

#### Endpoint

- **POST** `/api/users`

#### Description

- This endpoint allows you to add a new user to the database.

#### Request Body

- The request body should contain the following fields:

  - `first_name` (string): The first name of the user.
  - `last_name` (string): The last name of the user.
  - `email` (string): The email address of the user (email validation to be added).
  - `password` (string): The user's password (password encryption to be added).
  - `bio` (string): User's bio.
  - `profile_pic_url` (string): URL to the user's profile picture.

#### Example

- Request:

  ```http
  POST /api/users
  ```

  Request Body:

  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "password",
    "bio": "A passionate writer",
    "profile_pic_url": "https://example.com/profile-pic.jpg"
  }
  ```

- Response:

  ```json
  {
    "_id": "unique-user-id",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "bio": "A passionate writer",
    "profile_pic_url": "https://example.com/profile-pic.jpg",
    "__v": 0
  }
  ```

- Sample Screenshot for easier visualization:
    - ![/api/users](ImagesForReadme.md/post_user_sucessful.png 'POST /api/users sucess')

    - ![/api/users](ImagesForReadme.md/post_users_sucessful_mongodb.png '/api/users success mongodbview')


### List Blogs with Pagination

#### Endpoint

- **GET** `/api/blogs`

#### Description

- This endpoint lists blogs with pagination. It supports two query parameters:

  - `page` (optional, default: 1): The page number to return.
  - `limit` (optional, default: 10): The number of blogs per page.

#### Example

- Request:

  ```http
  GET /api/blogs?page=2&limit=5
  ```

- Response:

  ```json
  {
    "totalCount": 15,
    "results": [
      {
        "_id": "blog-id-1",
        "title": "Blog 1",
        // Other blog fields
      },
      {
        "_id": "blog-id-2",
        "title": "Blog 2",
        // Other blog fields
      },
      // More blog objects
    ],
    "next": {
      "page": 3,
      "limit": 5
    },
    "previous": {
      "page": 1,
      "limit": 5
    }
  }
  ```

- Sample Screenshot for easier visualization:
    - ![/api/blogs](ImagesForReadme.md/get_api_blogs_success.png 'GET /api/blogs success')

### Get Blogs by Tags

#### Endpoint

- **GET** `/api/blogs/tags/:tag`

#### Description

- This endpoint retrieves blogs

 by a specific tag.

#### URL Parameter

- `tag` (required): The tag to filter by.

#### Example

- Request:

  ```http
  GET /api/blogs/tags/example
  ```

- Response:

  ```json
  [
    {
      "_id": "blog-id-1",
      "title": "Example Blog 1",
      // Other blog fields
    },
    {
      "_id": "blog-id-2",
      "title": "Example Blog 2",
      // Other blog fields
    },
    // More blog objects
  ]
  ```
  
- Sample Screenshot for easier visualization:
    - ![/api/blogs/tags/:tag](ImagesForReadme.md/get_api_blogs_by_tags_success.png 'GET /api/blogs/tags/:tag success')

### Update Blog by ID

#### Endpoint

- **PATCH** `/api/blogs/:id`

#### Description

- This endpoint updates a blog by its unique ID.

#### URL Parameter

- `id` (required): The ID of the blog to update.

#### Request Body

- The request body should contain the fields you want to update.

#### Example

- Request:

  ```http
  PATCH /api/blogs/blog-id-1
  ```

  Request Body:

  ```json
  {
    "title": "Updated Blog Title",
    // Other fields to update
  }
  ```

- Response:

  ```json
  {
    "_id": "blog-id-1",
    "title": "Updated Blog Title",
    // Updated fields
  }
  ```
- Sample Screenshot for easier visualization:
    - ![/api/blogs/:id](ImagesForReadme.md/patch_api_by_id_blogs.png 'GET /api/blogs/:id success')

    - ![/api/blogs/:id](ImagesForReadme.md/patch_api_by_id_blogs_mongodb_success.png 'GET /api/blogs/:id success mongodb_view')


---

## TODO (Future Scope)

This section outlines potential future enhancements and improvements for the project:

- Add Swagger YAML file for API documentation.
- Implement unit tests for each JavaScript file.
- Add integration test cases.
- Implement field validations for API requests.
- Add route validations for robustness.
- Include a GitLab CI/CD YAML file for automated pipelines.


---
