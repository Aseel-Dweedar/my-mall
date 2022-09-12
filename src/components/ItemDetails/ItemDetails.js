import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router-dom";
import { fetchItem } from '../../api';
// import './'

function ItemDetails(props) {

    let { id } = useParams();
    const [item, setItem] = useState(null)

    const fetchOneItem = async () => {
        let { data } = await fetchItem(id);
        if (data) setItem(data);
    }

    useEffect(() => {
        fetchOneItem()
    }, [])

    return (
        <div className='details-container'>
            {
                item &&
                <Container>
                    <Row>
                        <Col md={6} xs={12}>
                            <h2>{item.title}</h2>
                            <p>{item.body}</p>
                        </Col>
                        <Col md={6} xs={12}>
                            <img 
                            style={{ width: '100%', objectFit :'contain'  }}
                            src={item.image} alt={item.title} />
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}

export default ItemDetails