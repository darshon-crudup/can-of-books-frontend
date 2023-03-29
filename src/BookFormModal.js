// FORM to add, vidref 11:34
// checkbox for status and url 
import React from "react";
import { Form, Button, Container} from 'react-bootstrap';



class BookFormModal extends React.Component {
  render() {

    return (
      <Container className="formAdd">
        <Form onSubmit={this.props.handleBookSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Check type="checkbox" label="Status" />
          </Form.Group>
          <Form.Group controlId="url">
            <Form.Check type="checkbox" label="url" />
          </Form.Group>
          <Button type="submit">Add Book</Button>
        </Form>
      </Container>

    )

  }
}


export default BookFormModal;