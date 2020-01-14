import React, { useState, useEffect, Fragment } from 'react'
import StackGrid from "react-stack-grid"
import { Empty, Card, Skeleton, Loading, Avatar } from 'antd'
import useAxios from '../hooks/useAxios'
import '../App.css'

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

  const timeAgo = (date) => {
    if (typeof date !== 'object') {
        date = new Date(date);
      }

      var seconds = Math.floor((new Date() - date) / 1000);
      var intervalType;

      var interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = 'year';
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = 'month';
        } else {
          interval = Math.floor(seconds / 604800);
          if (interval >= 1) {
            intervalType = 'week';
          } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
              intervalType = 'day';
            } else {
              interval = Math.floor(seconds / 3600);
              if (interval >= 1) {
                intervalType = "hour";
              } else {
                interval = Math.floor(seconds / 60);
                if (interval >= 1) {
                  intervalType = "minute";
                } else {
                  interval = seconds;
                  intervalType = "second";
                }
              }
            }
          }

        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += 's';
      }

      return interval + ' ' + intervalType + ' ago';
  }

  const fetch = () => {
    listSend(
      {
        params,
      },
      (response) => {
        setResponse((prevState) => ({
          ...prevState,
          results:response,
        }))
      }
    )
  }

  useEffect(() => {
    fetch()
  }, [params])

  const scrollCheck = (event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if (bottom) {
      console.log("At The Bottom"); //Add in what you want here
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
    if(listState.isFetching){
      return itemSkeleton()
    }
    return  response.results.map((item)=>(
      <div key={item.id}>
        <Card
          hoverable
          cover={<p className={'card-cover'} style={{fontSize:item.size+'px'}}>{item.face}</p>}
          bodyStyle={{padding:'14px',borderTop: '1px dotted #e8e8e8'}}
        >
          <Meta title={item.price+'¢'} description={timeAgo(item.date)} />
        </Card>
      </div>
    ))
  }

  return (
    <div onScroll={scrollCheck}>
      <StackGrid>
        {showItems()}
      </StackGrid>
    </div>

  );
}

export default List;
