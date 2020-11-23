import React, { useState, useEffect } from 'react';
import { Button, Spinner } from "react-bootstrap";
import BasicLayout from "../../layouts/BasicLayout";
import ListTweets from "../../components/ListTweets";
import { getTweetsFollowersApi } from "../../api/tweet";

import "./Home.scss";

export default function Home(props) {
    const { setRefreshCheckLogin } = props;
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getTweetsFollowersApi(page).then((response) => {
            if (!tweets && response) {
                setTweets(formatModel(response));
            } else {
                if (!response) {
                    setIsLoading(0);
                } else {
                    const dataFormatted = formatModel(response);
                    setTweets([...tweets, ...dataFormatted]);
                    setIsLoading(false);
                }
            }
        })
        .catch(() => {})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const onMoreData = () => {
        setIsLoading(true);
        setPage(page + 1);
    }

    return (
        <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="home__title">
                <h2>Inicio</h2>
            </div>
            {tweets && <ListTweets tweets={tweets} />}
            <Button onClick={onMoreData} className="load-more">
                {!isLoading ? (
                    isLoading !== 0 ? "Obtener más tweets" : "No hay más tweets"
                ) : (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            rola="status"
                            aria-hidden="true"
                        />
                    )
                }
            </Button>
        </BasicLayout>
    )
}

function formatModel(tweets) {
    const tweetsTemp = [];
    tweets.forEach(tweet => {
        tweetsTemp.push({
            _id: tweet._id,
            userId: tweet.userRelationId,
            message: tweet.Tweet.message,
            date: tweet.Tweet.date,
        });
    });
    return tweetsTemp;
}