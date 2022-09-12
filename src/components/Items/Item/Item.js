import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import './item.css'

function Item({ item ,onDeleteItem }) {

    return (
        <Card style={{ width: '18rem', margin: '0.5rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.body}</Card.Text>
                <Card.Link href={`/about/${item._id}`}>Read More</Card.Link>
            </Card.Body>
            {item.user?._id === localStorage.getItem('user') &&
                <Card.Footer className="text-muted">
                    <span onClick={() => onDeleteItem(item._id)} style={{ marginRight: '1rem', cursor: 'pointer' }}>🗑️</span>
                    <span style={{ cursor: 'pointer' }}>✏️</span>
                </Card.Footer>
            }
        </Card>
    )
}

export default Item