import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import WeekdayBadge from "../../components/WeekdayBadge";
import MentorInfo from "../../components/MentorInfo";

import { listMentors } from "../../actions/mentorActions";

const MentorListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const mentorList = useSelector((state) => state.mentorList);
  const { loading, error, mentors } = mentorList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listMentors());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const haltHandler = (mentor_id) => {
    window.confirm(`Halt the status of this mentor? [${mentor_id}]`);
  };

  return (
    <>
      <h3>導師列表</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>導師</th>
                <th>課程資訊</th>
                <th>上課時間設定</th>
                <th>預約狀態</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((mentor) => (
                <tr key={`m-${mentor._id}`}>
                  <td>
                    <MentorInfo mentor={mentor} />
                  </td>
                  <td>{mentor.course[0].gameName}</td>
                  <td>
                    可預約日:
                    {mentor.periods.weekdays &&
                      mentor.periods.weekdays.map((d) => (
                        <WeekdayBadge dayNumber={d} />
                      ))}
                    <br />
                    可預約起迄: {mentor.periods.startDate.substring(0, 10)} ~
                    {mentor.periods.endDate.substring(0, 10)}
                    <br />
                    請假起迄:
                    {mentor.periods.excludedStartDate
                      ? `${mentor.periods.excludedStartDate.substring(0, 10)} ~
                    ${mentor.periods.excludedEndDate.substring(0, 10)}`
                      : ""}
                    <br />
                  </td>
                  <td>
                    <LinkContainer to={`/mentors/mentor/${mentor._id}/edit`}>
                      <Button variant="dark" className="btn-sm" size="sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      size="sm"
                      onClick={() => haltHandler(mentor._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default MentorListScreen;
