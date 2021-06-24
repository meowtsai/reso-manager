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

const H55CardScreen = ({ history, match }) => {

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

    return (
        <>
          <h1>第五人格三周年活動留言列表</h1>
          <Row>
            <Col xs={12}>
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

                {cards.map(card => <tr>
                    <td>{card.nickname}</td>
                    <td>{card.greetings}</td>
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