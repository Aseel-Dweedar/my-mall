import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signin, signup } from '../../api';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

const Auth = () => {

    const [signUp, setSignUp] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    let navigate = useNavigate();

    const handleFormSubmit = async (e, type) => {
        e.preventDefault();
        let formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        let res;
        try {
            if (type === 'signup') {
                formData.firstName = e.target.first.value;
                formData.lastName = e.target.last.value;
                res = await signup(formData);
            } else {
                res = await signin(formData);
            }
            if (res.data) {
                localStorage.setItem('token', JSON.stringify(res.data.token));
                localStorage.setItem('user', res.data.result._id);
                navigate('/')
                window.location.reload(false);
            }
        } catch (error) {
            setErrorMsg(error.response.data.message);
        }
    }

    return (
        <div>

            {errorMsg && <Alert key="danger" variant="danger">
                {errorMsg}
            </Alert>}
            <Form onSubmit={(e) => handleFormSubmit(e, signUp ? 'signup' : 'signin')}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id='email' type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                {signUp &&
                    <>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control id='first' type="text" placeholder="First Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control id='last' type="text" placeholder="Last Name" />
                        </Form.Group>
                    </>
                }
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id='password' type="password" placeholder="Password" />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                >
                    {signUp ? 'Sign Up' : 'Sign In'}
                </Button>
            </Form>

            {
                signUp ?
                    <p>
                        Already have an account?
                        <Button variant="link"
                            onClick={() => setSignUp(false)}
                        >Sigh In</Button>
                    </p>
                    :
                    <p>
                        Don't Already have an account?
                        <Button variant="link"
                            onClick={() => setSignUp(true)}
                        >Sigh Up</Button>
                    </p>
            }
        </div>

    );
}

export default Auth;