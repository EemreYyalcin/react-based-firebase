import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {PasswordForgetLink} from '../PasswordForget';
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";

const SignInPage = () => (
    <div>
        <SignInForm/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <Grid textAlign='center' style={{height: '90vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Sign In
                    </Header>
                    <Form size='large' onSubmit={this.onSubmit}>
                        <Segment stacked>
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
                                value={password}
                                type='password'
                                name='password'
                            />

                            <Button fluid size='large' disabled={isInvalid} type="submit">
                                Sign In
                            </Button>
                            {error && <p>{error.message}</p>}
                        </Segment>
                    </Form>
                    <Message>
                        <SignUpLink/>
                    </Message>
                    <Message>
                        <PasswordForgetLink/>
                    </Message>
                </Grid.Column>
            </Grid>


        );
    }
}

const SignInLink = () => (
    <p>
        Do you have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
);

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export {SignInForm, SignInLink};