import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import {
    Table,
    Row,
    Col,
    Image,
    Button,
    Form,
    Badge,
    Toast,
  } from "react-bootstrap";
import { listCards, deleteCard } from "../actions/h55eventActions";
import Paginate from "../components/Paginate";

const H55CardScreen = ({ history, match }) => {
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
    const dispatch = useDispatch();

    const cardList = useSelector((state) => state.cardList);
    const { loading, error, cards=[] } = cardList;
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
          dispatch(listCards());
        } else {
          history.push("/login");
        }
      }, [dispatch, history,userInfo]);

      useEffect(() => {
        const { cards } = cardList;
    
        if (cards && cards.length > 0) {
          setPages(Math.ceil(cards.length / pageSize));
    
          
        }
      }, [cardList]);

      const deleteHandler = (nickname, id) => {
        if (
          window.confirm(
            `你確定要刪除${nickname}的這筆紀錄嗎(辨識id: ${id.substring(
              0,
              6
            )})這筆資料嗎, 沒有備分喔`
          )
        ) {
          //console.log("delete ", id);
          dispatch(deleteCard(id));
        }
      };

    return (
        <>
          <h1>第五人格三周年活動留言列表</h1>
          <Row>
          <Col>
              <Paginate pages={pages} page={page} setPage={(p) => setPage(p)} />
            </Col>
            
            <Col>
              共 {cards.length} 筆資料, 顯示 {(page - 1) * pageSize + 1}~{" "}
              {(page - 1) * pageSize + pageSize < cards.length
                ? (page - 1) * pageSize + pageSize
                : cards.length}
              筆
            </Col>
            </Row>
          <Row>
          <Col xs={3}>
            <h5>每日統計報表</h5>
            <DialyStatistics list={cards} />
          </Col>
          <Col xs={9}>
          
            <Table striped bordered hover>
                <thead>
                  <tr>
                  <th style={{ width: "100px", textAlign: "center" }}>暱稱</th>
                    <th style={{ width: "500px", textAlign: "center" }}>
                      留言
                    </th>
                    <th style={{ width: "100px", textAlign: "center" }}>
                      圖片連結
                    </th>
                    <th style={{ width: "100px", textAlign: "center" }}>
                      時間
                    </th>
                    
                    </tr>
                </thead>
                <tbody>

                {cards.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize).map(card => <tr>
                    <td>{card.nickname}</td>
                    <td>{card.greetings}
                    <Button
                          variant="danger"
                          className="btn-sm mt-3 ml-1"
                          onClick={() => deleteHandler(card.nickname, card._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                    </td>
                    <td>
                    <a href={card.imgUrl} target="_blank" rel="noopener noreferrer">
                                圖片
                              </a>
                              
                             </td>
                    <td>
                    {DateTime.fromISO(card.createdAt).toLocaleString(
                            DateTime.DATETIME_MED
                          )}
                      </td>
                </tr>)}

                </tbody>
            </Table>
            </Col>
        </Row>
        </>
        )
};

export default H55CardScreen;


const DialyStatistics = ({ list }) => {
  const alldate = [
    ...new Set(
      list.map((item) => DateTime.fromISO(item.createdAt).toLocaleString())
    ),
  ];

  const finalData = alldate.map((d) => {
    const dailyItems = list.filter(
      (item) => DateTime.fromISO(item.createdAt).toLocaleString() === d
    );
    const count1 = dailyItems.reduce(
      (prev, curr) => {
         
        return prev+1
      },
      0
    );
    return { d, c:count1 };
  });

  

  //console.log("finalData", finalData);

  //const statData = list.map((item) => item.category === "PG");
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">日期</th>
          <th scope="col">留言數</th>
          
        </tr>
      </thead>
      <tbody>
        {finalData.map((data) => (
          <tr>
            <td>{data.d}</td>
            <td>{data.c}</td>
           
          </tr>
        ))}
      </tbody>
     
    </Table>
  );
};