import React, { useState, useEffect } from 'react';
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import BasicLayout from "../../layouts/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import { getUserApi } from "../../api/user";

import "./User.scss";

function User(props) {
    const { match } = props;
    const [user, setUser] = useState(null);
    const { params } = match;
    const loggedUser = useAuth();
    useEffect(() => {
        getUserApi(params.id).then(response => {
            // console.log('response: ', response);
            setUser(response);
            if (!response) toast.error("El usuario no existe");
        }).catch(() => {
            toast.error("El usuario no existe");
        });
    }, [params]);

    return (
        <BasicLayout className="user">
            <div className="user__title">
                <h2>
                    {user ? `${user.name} ${user.surname}` : "Este usuario no existe"}
                </h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser} />
            <InfoUser user={user} />
            <div className="user__tweets">tuits usuario</div>
        </BasicLayout>
    );
}

export default withRouter(User);