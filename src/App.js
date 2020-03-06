import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom' 
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: [
      {
        value:'currentlyReading',
        name:'Currently Reading',
      },
      {
        value: 'wantToRead',
        name: 'Want to Read',
      },
      {
        value: 'read',
        name: 'read',
      }
    ]
  }
  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState( (prevState) => ({
          /* shelves: prevState.shelves.map( (shelf) =>{
            shelf.books = books.filter((book) =>{
             return book.shelf === shelf.value
            })
          })  */
          books
        }))
      })    
  }
  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then( (bookList) => {
        // change selected book
        book.shelf = shelf
        this.setState( (prevState) => ({
            books: prevState.books.filter( b => {
              return b.id !== book.id
            }).concat([book])
        }))
      })
  }

  render() {
    const { shelves, books } = this.state

    return (
      <div className="app">
        <Route exact path='/search' render={ () => (
          <SearchBook 
            myBookList={books} 
            handleShelfChange={this.handleShelfChange}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map( (shelf) => (
                  <div className="bookshelf" key={shelf.value}>
                    <h2 className="bookshelf-title">{ shelf.name }</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {/* shelf.books */}
                          {books
                            .filter((book)=> ( book.shelf === shelf.value))
                            .map( (book) => (
                              <li key={book.id}>
                                <div className="book">
                                  <div className="book-top">
                                    <div 
                                      className="book-cover" 
                                      style={{ 
                                        width: 128, 
                                        height: 193, 
                                        backgroundImage: `url("${book.imageLinks.thumbnail}")` 
                                      }}
                                    ></div>
                                    <div className="book-shelf-changer">
                                      <select 
                                        onChange={(e) => ( this.handleShelfChange(book, e.target.value) )}
                                        value={book.shelf}
                                      >
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="book-title">{book.title}</div>
                                  <div className="book-authors">{book.authors.toString()}</div>
                                </div>
                              </li>
                            ))}
                        </ol>
                      </div>
                    </div>
                ))}
              </div>
            </div>
            <div>
              <Link 
                className="open-search"
                to='/search'>
                  <button>Add a book</button> 
              </Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
