import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import {compose} from 'recompose';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'


import * as ROUTES from '../../constants/routes';
import {SignInLink} from "../SignIn";

const SignUpPage = () => (
    <div>
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    firstName: "",
    lastName: "",
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        // this.props.history.push(ROUTES.SIGN_UP);
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmit = event => {
        const {username, email, passwordOne, firstName, lastName} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        firstName,
                        lastName
                    });
            })
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            firstName,
            lastName,
            error,
        } = this.state;


        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            firstName === '' ||
            lastName === '';
        return (
            <Grid textAlign='center' style={{height: '90vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Sign Up
                    </Header>
                    <Form size='large' onSubmit={this.onSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Username"
                            />

                            <Form.Input
                                fluid
                                name="firstName"
                                value={firstName}
                                onChange={this.onChange}
                                type="text"
                                placeholder="First Name"
                            />


                            <Form.Input
                                fluid
                                name="lastName"
                                value={lastName}
                                onChange={this.onChange}
                                type="text"
                                placeholder="lastName"
                            />

                            <Form.Input
                                fluid icon='mail'
                                iconPosition='left'
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                            />

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                onChange={this.onChange}
                                value={passwordOne}
                                type='password'
                                name='passwordOne'
                            />

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Confirm Password'
                                onChange={this.onChange}
                                value={passwordTwo}
                                type='password'
                                name='passwordTwo'
                            />
                            <Button fluid size='large'  disabled={isInvalid} type="submit">
                                Sign Up
                            </Button>
                            {error && <p>{error.message}</p>}
                        </Segment>
                    </Form>
                    <Message>
                        <SignInLink/>
                    </Message>
                </Grid.Column>
            </Grid>
        );

    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};