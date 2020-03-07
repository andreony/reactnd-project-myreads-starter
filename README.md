
# MyReads Project

  The MyReads Application stands out as a personal digital library, comprised of several shelves representing the state of each book in your library.
  The user has the option to search books through Books API using the search feature. This returns up to 20 books matching your query
  
## Table of Contents

- [Table of Contents](#table-of-contents)
- [Intro](#intro)
- [Instructions](#instructions)
- [Application](#application )
- [Search Books](#search)
- [Backend Server](#backend-server)
- [To Do(s)](#to-dos)

## Instructions

Launch application :  

* install all project dependencies with `npm install`

* start the development server with `npm start`
  

## Application 
Gives the user the option to and/change the current shelf each book sits on from  a list of three:

 - Currently Reading
 - Want to Read 
 - Read

Each book can be changed between shelves, or removed from the library by selecting the **'None'** shelf.
 

## Backend Server

  

. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:
 

*  [`getAll`](#getall)

*  [`update`](#update)

*  [`search`](#search)

  

### `getAll`

  

Method Signature:

  

```js

getAll()

```

  

* Returns a Promise which resolves to a JSON object containing a collection of book objects.

* This collection represents the books currently in the bookshelves.

  

### `update`

  

Method Signature:

  

```js

update(book, shelf)

```

  

* book: `<Object>` containing at minimum an `id` attribute

* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]

* Returns a Promise which resolves to a JSON object containing the response data of the POST request

  

### `search` 

  

Method Signature:

  

```js

search(query)

```

  

* query: `<String>`

* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.

## To Do(s)

 - Add a bulk book shelf update

