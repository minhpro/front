import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import authApi from "api/authApi";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();  
    useEffect(() => {   
        const currentParams = Object.fromEntries([...searchParams]);
        console.log(searchParams);
        console.log(currentParams);
        const code = currentParams['code'];
        const state = currentParams['state'];

        if(code) {
            authApi.loginWithProvider(code, state)
                .then(response => {
                    localStorage.setItem("token", response.access_token);
                    alert("You're successfully logged in!");
                    return navigate("/");
                }).catch(error => {
                    alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
                    return navigate("/error")
                });
        } else {
            return navigate("/login");
        }
    }, [searchParams]);

    return <div>Login with LMS</div>;
}

export default OAuth2RedirectHandler;
