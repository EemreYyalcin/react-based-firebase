import React from 'react';

import {withFirebase} from '../Firebase';
import {Menu} from "semantic-ui-react";

const SignOutButton = ({ firebase }) => (
    <Menu.Item onClick={firebase.doSignOut}
        name='signOut'
        active='false'
        position='right'
    >
        Sign Out
    </Menu.Item>
    // <button type="button" onClick={firebase.doSignOut}>
    //     Sign Out
    // </button>
);

export default withFirebase(SignOutButton);