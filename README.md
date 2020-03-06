
# MyReads Project

  

The app was forked from the [starter template repository](https://github.com/andreony/reactnd-project-myreads-starter) and was changes as required to perform all tasks listed inside the rubric for the MyReads Project.
  

## TL;DR

  

Launch application :  

* install all project dependencies with `npm install`

* start the development server with `npm start`
  

## What's been added 

```
├── App.js 

 -  added API calls to backend and state update handlers
 -  added react router logic to allow rotes and enable the back button 

├── Search.js

 - This is a new component which gives the option to search and add new books
```


  

## Backend Server

  

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

  

*  [`getAll`](#getall)

*  [`update`](#update)

*  [`search`](#search)

  

### `getAll`

  

Method Signature:

  

```js

getAll()

```

  

* Returns a Promise which resolves to a JSON object containing a collection of book objects.

* This collection represents the books currently in the bookshelves in your app.

  

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

* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## To Do(s)

 - Add a bulk book shelf update

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

 
