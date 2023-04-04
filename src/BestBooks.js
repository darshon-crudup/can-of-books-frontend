import axios from 'axios';
import React from 'react';
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import './BestBooks.css';
import { Button, } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import UpdateBookForm from './UpdateBookForm'


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookToUpdate: null,
      books: [],
      errorMessage: '',
      showModal: false,
      showForm: false
    }
  }
  //   mar28 updates

  //handlers FOR ADDING
  //*********  ADDING BOOK TO DATABASE W USE OF 2 HANDLERS
  handleShowModal = () => {
    this.setState({
      showModal: true
    })
  }


  handleHideModal= () => {
    this.setState({
      showModal: false,
      showForm: false
    })
  }



  handleShowForm = (book) => {
    this.setState({
      showForm: true,
      bookToUpdate: book
    })
  }

  //HANDLER #1 - COMES FROM FORM - BUILD A BOOK OBJECT
  handleBookSubmit = (event) => {
    event.preventDefault();

    let bookObj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
      url: event.target.url.checked
    }

    console.log(bookObj);

    this.postBook(bookObj);
  }

  //HANDLER #2 - POST TO THE DATABASE
  postBook = async (bookObj) => {
    try {

      let url = `${process.env.REACT_APP_SERVER}/books`

      // **** On a post, we pass in 2 args to axios, 1st is the url, 2nd is the data that will go on the request.body
      let createdBook = await axios.post(url, bookObj)

      this.setState({
        books: [...this.state.books, createdBook.data]
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  // UPDATE 23mar29 Lab13
  handleBookUpdate = async (bookObj) => {
    try {

      let url = `${process.env.REACT_APP_SERVER}/books/${bookObj._id}`

      // **** On a post, we pass in 2 args to axios, 1st is the url, 2nd is the data that will go on the request.body
      let updateBook = await axios.put(url, bookObj)

    let updatedBookArray = this.state.books.map(existingBook => {
      return existingBook._id === bookObj._id
      ? updateBook.data
      : existingBook
    })

      this.setState({
        books: updatedBookArray
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  // **** REACT LIFECYCLE METHOD
  componentDidMount = async () => {
    console.log(process.env.REACT_APP_SERVER)
    try {
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: "/books"
      }
      //entire url = "http://localhost:3001/books"
      // const res = await axios(config);
      const res = await axios(config)
      console.log(res.data);

      this.setState({
        books: res.data
      })

    } catch (err) {
      console.error(err);
      this.setState({
        errorMessage: err.message
      });

      console.log(err);
    };

  }
  //   mar28 updates

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
          <Container>


            <Carousel>
              {this.state.books.map((book, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src='https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                    alt={book.title}
                  />
                  <Carousel.Caption>
                    <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}> {book.title}</h3>
                    <Book
                      bookToPassDown={book}
                      handleShowForm={() => this.handleShowForm(book)}
                      deleteBook={this.deleteBook}
                    />
                  </Carousel.Caption>
                </Carousel.Item>
              ))}

            </Carousel>

            {this.state.showModal ? <BookFormModal handleBookSubmit={this.handleBookSubmit} />: <button onClick={this.handleShowModal} >Add Book Form</button> }

            {this.state.showForm &&
              <UpdateBookForm
              book={this.state.bookToUpdate}
              updateBook={this.handleBookUpdate}
              />
            }
            
            <button onClick={this.handleHideModal} > Close Form</button>
            
          </Container>
        ) : (
          <h3>No Books Found :</h3>
          )
        }
      </>





    )
  }
}

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.props.bookToPassDown.title} is {this.props.bookToPassDown.description} book
          <Button onClick={() => { this.props.deleteBook(this.props.bookToPassDown._id) }}>Delete</Button>
          <Button onClick={this.props.handleShowForm}>Open Update Form</Button>
        </div>


      </div>
    )
  }
};




export default BestBooks;


// saw url schema in backend seed.js 
// clear.js, changed books to books


