import React, { useState, useCallback } from 'react';
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { API_HOST } from "../../../utils/constants";
import { Camera } from "../../../utils/icons";
import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from "../../../api/user";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const { user, setShowModal } = props;
    const [formData, setFormData] = useState(initialValue(user));
    const [bannerUrl, setBannerUrl] = useState(
        user?.banner ? `${API_HOST}/get_banner?id=${user.id}` : null
    );
    const [avatarUrl, setAvatarUrl] = useState(
        user?.avatar ? `${API_HOST}/get_avatar?id=${user.id}` : null
    );
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file));
        setBannerFile(file);
    });

    const {
        getRootProps: getRootBannerProps,
        getInputProps: getInputBannerProps
    } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    });

    const {
        getRootProps: getRootAvatarProps,
        getInputProps: getInputAvatarProps
    } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar,
    });

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        if (bannerFile) {
            await uploadBannerApi(bannerFile).catch(() => {
                toast.error("Ocurrió un error al subir el nuevo banner");
            })
        }
        if (avatarFile) {
            await uploadAvatarApi(avatarFile).catch(() => {
                toast.error("Ocurrió un error al subir el nuevo avatar");
            })
        }
        await updateInfoApi(formData).then(() => {
            setShowModal(false);
        })
        .catch(() => {
            toast.error("Ocurrió un error al actualizar los datos");
        });
        setLoading(false);
        window.location.reload();
    }

    return (
        <div className="edit-user-form">
            {/* Banner */}
            <div
                className="banner"
                style={{ backgroundImage: `url('${bannerUrl}')` }}
                {...getRootBannerProps()}
            >
                <input {...getInputBannerProps()} />
                <Camera />
            </div>
            {/* Avatar */}
            <div
                className="avatar"
                style={{ backgroundImage: `url('${avatarUrl}')` }}
                {...getRootAvatarProps()}
            >
                <input {...getInputAvatarProps()} />
                <Camera />
            </div>
            <Form onSubmit={onSubmit}>
                {/* Name */}
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                name="name"
                                defaultValue={formData.name}
                                onChange={onChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellido"
                                name="surname"
                                defaultValue={formData.surname}
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                {/* Biograpgy */}
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        row="3"
                        placeholder="Agrega tu biografía"
                        type="text"
                        name="biography"
                        defaultValue={formData.biography}
                        onChange={onChange}
                    />
                </Form.Group>
                {/* Website */}
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="sitio web"
                        name="website"
                        defaultValue={formData.website}
                        onChange={onChange}
                    />
                </Form.Group>
                {/* Birthday */}
                <Form.Group>
                    <DatePicker
                        placeholder="Fecha de nacimiento"
                        locale={es}
                        selected={new Date(formData.birthday)}
                        onChange={date => setFormData({ ...formData, birthday: date })}
                    />
                </Form.Group>

                <Button className="btn-submit" variant="primary" type="submit" >
                    {loading && <Spinner animation="border" size="sm" /> } Actualizar
                </Button>
            </Form>
        </div>
    );
}

function initialValue(user) {
    return {
        name: user.name || "",
        surname: user.surname || "",
        biography: user.biography || "",
        location: user.location || "",
        website: user.website || "",
        birthday: user.birthday || "",
    }
}
