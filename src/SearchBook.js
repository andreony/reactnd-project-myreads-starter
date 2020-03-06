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
					books: books
				}))
			})
	}

	render(){
		const { query, books } = this.state
		const { handleShelfChange, myBookList } = this.props
		let showingBooks
		let notFound = 'hide'
		try{
			showingBooks = query === '' ? (
				[]
			) : (
					books.filter( (book) => (
						book.title.toLowerCase().includes(query.toLowerCase()) || 
						book.authors.toString().toLowerCase().includes(query.toLowerCase())
				 ))
			)  
		}
		catch(err){
			showingBooks = []
			notFound = ''
		}

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
						{showingBooks && (showingBooks.map( (book) => (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
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