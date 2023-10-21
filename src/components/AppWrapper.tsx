import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {TChildren} from "./AuthProviderSkeleton.tsx";
function AppWrapper({ children }:TChildren) {
    const {
        isLoading,
        error
    } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>You have an error {error.message}</div>;
    }
    return <>{children}</>;
}
export default AppWrapper;