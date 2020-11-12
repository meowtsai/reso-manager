import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import WeekdayBadge from "../../components/WeekdayBadge";
import { getMentorDetails, updateMentor } from "../../actions/mentorActions";
import { MENTOR_UPDATE_RESET } from "../../constants/mentorsConstants";
import MentorInfo from "../../components/MentorInfo";

const MentorEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [mentorStatus, setMentorStatus] = useState("false");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [weekdays, setWeekdays] = useState([]);
  const [excludedStartDate, setExcludedStartDate] = useState(null);
  const [excludedEndDate, setExcludedEndDate] = useState(null);

  const mentorId = match.params.id;

  const mentorDetails = useSelector((state) => state.mentorDetails);
  const { loading, error, mentor } = mentorDetails;

  const mentorUpdate = useSelector((state) => state.mentorUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = mentorUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MENTOR_UPDATE_RESET });
      history.push("/mentors/mentorlist");
    } else {
      if (!mentor.name || mentor._id !== mentorId) {
        dispatch(getMentorDetails(mentorId));
      } else {
        setMentorStatus(mentor.status);
        setStartDate(mentor.periods.startDate.substring(0, 10));
        setEndDate(mentor.periods.endDate.substring(0, 10));
        setWeekdays(mentor.periods.weekdays);
        setExcludedStartDate(
          mentor.periods.excludedStartDate?.substring(0, 10)
        );
        setExcludedEndDate(mentor.periods.excludedEndDate?.substring(0, 10));
      }
    }
  }, [dispatch, history, mentorId, mentor, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateMentor({
        _id: mentorId,
        status: mentorStatus,
        periods: {
          weekdays,
          startDate,
          endDate,
          excludedStartDate,
          excludedEndDate,
        },
      })
    );
  };

  const getWeekDays = (d) => {
    return weekdays.indexOf(d) > -1 === true ? "true" : "";
  };

  return (
    <>
      <Link to="/mentors/mentorlist" className="btn btn-light my-3">
        回列表
      </Link>
      <FormContainer>
        <h1>導師資訊維護</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {mentor && <MentorInfo mentor={mentor} />}
            <hr />
            <Form.Group className="mb-4">
              <Form.Label>可預約狀態</Form.Label>
              <Form.Check
                type="switch"
                id="status-switch"
                defaultChecked={mentorStatus === "1" ? "true" : ""}
                checked={mentorStatus === 1 ? "true" : ""}
                onChange={(e) => setMentorStatus(e.target.checked ? 1 : 0)}
                label="啟用中"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>可預約日期區間</Form.Label>
              <Form.Row>
                <Col xs={5}>
                  {" "}
                  <Form.Control
                    inline="true"
                    id="startDate"
                    name="startDate"
                    type="date"
                    defaultValue={startDate}
                    max={endDate}
                  />{" "}
                </Col>
                <Col xs={1}>~</Col>
                <Col xs={6}>
                  <Form.Control
                    inline="true"
                    id="endDate"
                    name="endDate"
                    type="date"
                    defaultValue={endDate}
                    min={startDate}
                  />{" "}
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>可預約日</Form.Label>
              <Form.Row>
                {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                  <Fragment key={`weekdayfrag-${d}`}>
                    <Form.Check
                      className="mr-0 ml-1"
                      inline="true"
                      type={"checkbox"}
                      id={`custom-checkbox${d}`}
                      aria-label={`weekday-${d}`}
                      key={`weekdaycheckbox-${d}`}
                      defaultChecked={getWeekDays(d)}
                      checked={weekdays.indexOf(d) > -1}
                      onChange={(e) =>
                        e.target.checked
                          ? setWeekdays([...weekdays, d])
                          : setWeekdays(weekdays.filter((wd) => wd !== d))
                      }
                    />
                    <WeekdayBadge styleClass="ml-0 mr-1" dayNumber={d} />
                  </Fragment>
                ))}
              </Form.Row>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>請假</Form.Label>
              <Form.Row>
                <Col xs={5}>
                  {" "}
                  <Form.Control
                    inline="true"
                    id="excludedStartDate"
                    name="excludedStartDate"
                    type="date"
                    defaultValue={excludedStartDate}
                  />{" "}
                </Col>
                <Col xs={1}>~</Col>
                <Col xs={6}>
                  <Form.Control
                    inline="true"
                    id="excludedEndDate"
                    name="excludedEndDate"
                    type="date"
                    defaultValue={excludedEndDate}
                  />{" "}
                </Col>
              </Form.Row>
            </Form.Group>

            <Button type="submit" variant="primary">
              更新
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default MentorEditScreen;
