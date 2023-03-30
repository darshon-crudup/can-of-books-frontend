import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

class UpdateBookForm extends React.Component {

  handleBookSubmit = (event) => {
    event.preventDefault();

    let bookToUpdate = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
      url: event.target.url.checked,
      _id: this.props.book._id,
      __v: this.props.book.__v
    }

    // HANDLER FROM APP.JS TO UPDATE THE DATABASE
    this.props.updateBook(bookToUpdate);   //initially was this.props.updateBook(bookToUpdate)
  
  }

  render() {
    return (
      <Container className="mt-5">
        <Form onSubmit={this.handleBookSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" defaultValue={this.props.book.title}/>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" defaultValue={this.props.book.description}/>
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Check type="checkbox" label="status" defaultChecked={this.props.book.status}/>
          </Form.Group>

          <Form.Group controlId="url">
            <Form.Check type="checkbox" label="url" defaultChecked={this.props.book.url} />
          </Form.Group>

          <Button type="submit">Update Book</Button>
        </Form>
      </Container>
    )
  }
}

export default UpdateBookForm;