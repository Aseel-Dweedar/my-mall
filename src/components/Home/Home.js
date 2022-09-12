import React, { useState, useEffect } from 'react'
import Items from '../Items/Items'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Home.css'
import { fetchItems, createItem, deleteItem } from '../../api';

function Home() {

    const [isExist, setIsExist] = useState(false)
    const [items, setItems] = useState(null)

    const fetchData = async () => {
        let { data } = await fetchItems();
        setItems(data.data)
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('user')

        let formData = {
            title: e.target.title.value,
            body: e.target.body.value,
            image: e.target.image.value,
            user : userId
        }

        let {data} = await createItem(formData);
        if (data) fetchData()

    }

    const onDeleteItem = async (id) => {
        let {data} = await deleteItem(id);
        if (data) fetchData()
    }

    useEffect(() => {
        if (localStorage?.getItem('token')) setIsExist(true);
        fetchData()
    }, [])


    return (
        <div className="home-container" >
            {items && <Items onDeleteItem={onDeleteItem} items={items} />}
            {isExist ? <form onSubmit={formSubmit} className="home-form" >
                <Form.Group className="mb-3">
                    <Form.Label>Your Item</Form.Label>
                    <Form.Control id='title' type="text" placeholder="Your Item" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>More Details</Form.Label>
                    <Form.Control id='body' type="text" placeholder="More Details" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control id='image' type="text" placeholder="Image Link" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>:
            <div>
                <h2>Log In To Add Items</h2>
            </div>
            }
        </div>
    )
}

export default Home