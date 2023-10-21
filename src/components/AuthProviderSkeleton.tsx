import React, {ReactNode} from 'react';
import {Auth0Provider} from "@auth0/auth0-react";

export type TChildren = {
    children:ReactNode
}

const AuthProvider = ({children}:TChildren) => {





    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            {children}
        </Auth0Provider>
    )
}

export default AuthProvider