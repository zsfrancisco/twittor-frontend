import React, { useState, useEffect } from 'react';
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce";
import BasicLayout from "../../layouts/BasicLayout";
import ListUsers from "../../components/ListUsers";
import { getFollowApi } from "../../api/follow";

import "./Users.scss";

function Users(props) {
    const { setRefreshCheckLogin, location, history } = props;
    // console.log(props);
    const [users, setUsers] = useState(null);
    const params = useUsersQuery(location);
    const [typeUser, setTypeUser] = useState(params.type || "follow");
    const [isLoading, setIsLoading] = useState(false);

    const onSearch = useDebouncedCallback((value) => {
        setUsers(null);
        history.push({
            search: queryString.stringify(
                { ...params, search: value, page: 1 }
            )
        });
    }, 200);

    useEffect(() => {
        getFollowApi(queryString.stringify(params))
            .then((response) => {
                // eslint-disable-next-line eqeqeq
                if (params.page == 1) {
                    if (isEmpty(response)) {
                        setUsers([]);
                    } else {
                        setUsers(response);
                    }
                } else {
                    if (!response) {
                        setIsLoading(0);
                    } else {
                        setUsers([...users, ...response]);
                        setIsLoading(false);
                    }
                }
            })
            .catch(() => {
                setUsers([]);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const onChangeType = (type) => {
        console.log("Entra")
        setUsers(null);
        if (type === "new") {
            setTypeUser("new");
        } else {
            setTypeUser("follow");
        }
        history.push({
            search: queryString.stringify({ type: type, page: 1, search: "" }),
        });
    };

    const onMoreData = () => {
        setIsLoading(true);
        const newPage = parseInt(params.page) + 1;
        console.log("newPage: ", newPage);
        history.push({
            search: queryString.stringify({ ...params, page: newPage }),
        });
    }

    return (
        <BasicLayout
            className="users"
            title="Usuarios"
            setRefreshCheckLogin={setRefreshCheckLogin} >
            <div className="users__title">
                <h2>Usuarios</h2>
                <input
                    type="text"
                    placeholder="Busca un usuario"
                    onChange={(e) => onSearch.callback(e.target.value)}
                />
            </div>

            <ButtonGroup className="users__options">
                <Button className={typeUser === "follow" && "active"} onClick={() => onChangeType("follow")}>
                    Siguiendo
                </Button>
                <Button className={typeUser === "new" && "active"} onClick={() => onChangeType("new")}>
                    Nuevos
                </Button>
            </ButtonGroup>

            {!users ? (
                <div className="users__loading">
                    <Spinner animation="border" variant="info" />
                    Buscando usuarios
                </div>
            ) : (
                    <>
                        <ListUsers users={users} />
                        <Button onClick={onMoreData} className="load-more">
                            {!isLoading ? (
                                isLoading !== 0 && "Cargar más usuarios"
                            ) : (
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                )

                            }
                        </Button>
                    </>
                )}
        </BasicLayout>
    )
}

function useUsersQuery(location) {
    const { page = 1, type = "follow", search } = queryString.parse(location.search);
    return { page, type, search };
}

export default withRouter(Users);