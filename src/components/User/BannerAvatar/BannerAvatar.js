import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import "./BannerAvatar.scss";
import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../../User/EditUserForm";
import AvatarNoFound from "../../../assets/img/png/avatar-no-found.png";
import { API_HOST } from '../../../utils/constants';
import { checkFollowApi, followUserApi, unfollowUserApi } from "../../../api/follow";

export default function BannerAvatar(props) {
    const { user, loggedUser } = props;
    const [showModal, setShowModal] = useState(false);
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setreloadFollow] = useState(false);
    const bannerUrl = user?.banner ? `${API_HOST}/get_banner?id=${user.id}` : null;
    const avatarUrl = user?.avatar ? `${API_HOST}/get_avatar?id=${user.id}` : AvatarNoFound;
    useEffect(() => {
        if (user) {
            checkFollowApi(user?.id).then(response => {
                const isFollowed = response?.status ? true : false;
                setFollowing(isFollowed);
            });
            setreloadFollow(false);
        }
    }, [user, reloadFollow]);

    const onFollow = () => {
        followUserApi(user.id).then(() => {
            setreloadFollow(true);
        })
    }

    const onUnFollow = () => {
        unfollowUserApi(user.id).then(() => {
            setreloadFollow(true);
        })
    }

    return (
        <div
            className="banner-avatar"
            style={{ backgroundImage: `url('${bannerUrl}')` }}
        >
            <div
                className="avatar"
                style={{ backgroundImage: `url('${avatarUrl}')` }}
            ></div>
            {user && (
                <div className="options">
                    {loggedUser._id === user.id && <Button onClick={() => setShowModal(true)}>Edtar perfil</Button>}
                    {loggedUser._id !== user.id && following !== null &&
                        (following ?
                            <Button onClick={onUnFollow} className="unfollow">
                                <span>Siguiendo</span>
                            </Button> :
                            <Button onClick={onFollow}>Seguir</Button>
                        )
                    }
                </div>
            )}
            <ConfigModal show={showModal} setShow={setShowModal} title="Editar perfil" >
                <EditUserForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    );
}
