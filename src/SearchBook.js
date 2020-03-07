import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { DebounceInput } from 'react-debounce-input';

class SearchBook extends Component{

	state = {
			query: '',
			books: []
	}

	updateQuery = (query) =>{
		BooksAPI.search(query)
			.then( (books) =>{
				this.setState( () => ({
					query: query,
					/* handle not found - server returns object */
					books: books && books.length > 0 ? (
						books
					) : (
						[]
					)
				}))
			})
	}

	render(){
		const { query, books } = this.state
		const { handleShelfChange, myBookList } = this.props
		let notFound = query.length !== 0 && !books.length ? 'show' : 'hide'

		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link 
						className="close-search" 
						to='/'>
						Back
					</Link>
					<div className="search-books-input-wrapper">
						<DebounceInput
          		minLength={2}
         			debounceTimeout={300}
							type="text" 
							placeholder="Search by title or author"
							value={query}
							onChange = {(event) => this.updateQuery(event.target.value)}
							/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books && (books.map( (book) => (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div 
											className="book-cover" 
											style={book.imageLinks ? (
													{ 
														width: 128, 
														height: 193,
														backgroundImage: `url("${book.imageLinks.thumbnail}")` 
													}
												):(
													{ 
														width: 128, 
														height: 193,
														backgroundImage: 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbookshoptalk.files.wordpress.com%2F2011%2F10%2Fgeneric-book-cover.jpg%3Fw%3D190&f=1&nofb=1")' 
													}
												)
											}></div>
										<div className="book-shelf-changer">
											<select 
												value={myBookList.some( myBook => myBook.id === book.id) ? (
														myBookList.filter( (myBook) => myBook.id === book.id )[0].shelf
														) : (
																'none'
												)} 
												onChange={ (e) => (handleShelfChange(book, e.target.value))}
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
									<div className="book-authors">{book.authors}</div>
								</div>
							</li>
						)))}
					</ol>
					<div className={`query-not-found ${notFound}`}>No matching result for '{query}' </div>
				</div>
			</div>
		)
	}
}

export default SearchBook