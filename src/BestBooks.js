import axios from 'axios';
import React from 'react';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
 
  //   mar28 updates
getBookss = async () => {
  try {
    let url = `${process.env.REACT_APP_SERVER}/books`

    let bookData = await axios.get(url);

    this.setState({
      books: bookData.data
    })
  } catch (error) {
    console.log(error.response)
  }
}

deleteBook = async (id) => {
  try {
// TODO: AXIOS is going to send an ID of the book to delete
    let url = `${process.env.REACT_APP_SERVER}/books/${id}`

    await axios.delete(url);

// TODO: UPDATE STATE TO REMOVE THAT DELETED BOOK
    let updatedBooks = this.state.books.filter(book => book._id !== id);

    this.setState({
      books: updatedBooks
    })


  } catch (error) {
    console.log(error.response)
  }
}
  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
