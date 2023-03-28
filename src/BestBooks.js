import React from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import './BestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: '',
    }
  }

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
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
