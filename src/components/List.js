import React, { useState, useEffect, Fragment, useRef } from 'react'
import StackGrid from "react-stack-grid"
import { Empty, Card, Skeleton, Loading, Avatar } from 'antd'
import useAxios from '../hooks/useAxios'
import '../App.css'
import {timeAgo, toDollars} from '../helpers'

const { Meta } = Card

const List = ()=> {
  const [deleteId, setDeleteId] = useState(null)
  const [params, setParams] = useState({
    _page: 1,
    _limit: 15,
  })

  const [response, setResponse] = useState({
    count: 0,
    filtered: 0,
    page: 0,
    totalPage: 0,
    pageSize: 0,
    results: [],
  })

  const [listState, listSend] = useAxios({
    url: `api/products`,
  })

  const [deleteState, deleteSend] = useAxios({
    url: `api/products/${deleteId}`,
    method: 'DELETE',
  })

  const fetch = () => {
    listSend(
      {
        params,
      },
      (response) => {
        setResponse((prevState) => ({
          ...prevState,
          // results: response
          results:prevState && prevState.results.concat(response),
        }))
      }
    )
  }

  const loadMore = () => {
    setParams((prevState) => ({
      ...prevState,
      _page:prevState._page+1,
    }))
  }

  useEffect(() => {
    fetch()
  }, [params])

  const prevScrollY = useRef(0);

  const [goingUp, setGoingUp] = useState(false);

  const limitScroll = Math.max( document.body.scrollHeight) - 401;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
      // console.log(goingUp, currentScrollY);
      // console.log(limitScroll)
      trackScrolling()
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  const trackScrolling = () => {
    const wrappedElement = document.getElementById('scrollcontainer');
    if (isBottom(wrappedElement)) {
      if(!listState.isFetching){
        console.log(listState.isFetching)
        console.log('header bottom reached');
        console.log(params._page)
        loadMore()
      }
    }
  };

  const itemSkeleton = () => {
    return Array.from(Array(params._limit), (e, i) => (
      <div key={i}>
        <Skeleton loading={true} active>
          <Meta
            title="Card title"
            description="This is the description"
          />
      </Skeleton>
      </div>
    ))
  }

  const showItems = () => {
    return  response.results.map((item)=>(
      <div key={item.id}>
        <Card
          hoverable
          cover={<p className={'card-cover'} style={{fontSize:item.size+'px'}}>{item.face}</p>}
          bodyStyle={{padding:'14px',borderTop: '1px dotted #e8e8e8'}}
        >
          <Meta title={toDollars(item.price)} description={timeAgo(item.date)} />
        </Card>
      </div>
    ))
  }

  return (
    <Fragment>
      <StackGrid columnWidth={200}>
        {showItems()}
        {listState.isFetching && (
          itemSkeleton()
        )}
      </StackGrid>
      <div id="scrollcontainer">
      </div>
    </Fragment>
  );
}

export default List;
