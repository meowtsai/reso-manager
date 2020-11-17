import React, { useEffect, useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listRegisters, updateRegister } from "../../actions/mentorActions";
const RecordListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const registerList = useSelector((state) => state.registerList);
  const {
    loading,
    error,
    registers,
    games,
    mentors,
    wirereports,
    updateLoading,
    updateError,
    record: updatedRecord,
  } = registerList;

  const courses = games.map((g) => g.courses).flat();
  //console.log(courses);

  useEffect(() => {
    if (userInfo) {
      dispatch(listRegisters());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const haltHandler = (mentor_id) => {
    window.confirm(`Halt the status of this mentor? [${mentor_id}]`);
  };

  const renderCourseInfo = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    // const course = games
    //   .map((g) => g.courses)
    //   .filter((c) => c._id === courseId)[0];

    return (
      <small>
        {" "}
        {course.title} <br />
        {course.desc} <br />${course.fee}{" "}
      </small>
    );
  };

  const renderReportData = (rowId) => {
    const report = wirereports.filter((rw) => rw.registerId === rowId);
    if (report.length > 0) {
      return (
        <div className="small">
          <b>帳戶名稱</b>:{report[0].wireName} <br />
          <b>銀行名稱</b>:{report[0].bankName} <br />
          <b>後五碼</b>:{report[0].bankCode} <br />
          <b>回報時間</b>:
          {DateTime.fromISO(report[0].date).toLocaleString(
            DateTime.DATETIME_MED
          )}
          <br />
        </div>
      );
    } else {
      return null;
    }
  };

  const confirmPayment = (registerId) => {
    //console.log("confirmPayment", registerId);
    dispatch(updateRegister({ _id: registerId, status: 4 }));
  };

  return (
    <>
      <h3>課程預約紀錄列表</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {updateLoading && <Loader />}
          {updateError && <Message variant="danger">{updateError}</Message>}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>學員資料</th>
                <th>預約日期</th>
                <th>預約時段</th>

                <th>課程資訊</th>
                <th>導師</th>
                <th>填寫時間</th>

                <th>狀態及匯款資訊</th>
                <th>action</th>
              </tr>
            </thead>

            <tbody>
              {registers.map((record) => (
                <tr
                  key={`r-${record._id}`}
                  style={
                    updatedRecord?._id === record._id
                      ? { backgroundColor: "lightcyan" }
                      : null
                  }
                >
                  <td>
                    {" "}
                    姓名: {record.name}
                    <br />
                    <i className="fas fa-envelope mr-2"></i>
                    <a href={`mailto:${record.email}`}>{record.email}</a>
                    <br />
                    <i className="fas fa-phone mr-2"></i>
                    {record.phone}
                    <br />
                    <i className="fab fa-discord text-purple mr-2"></i>{" "}
                    {record.discordAccount}
                  </td>
                  <td>{renderColum("registerDate", record.registerDate)}</td>
                  <td>{record.timeSlot}</td>
                  <td>{renderCourseInfo(record.course)}</td>
                  <td>{mentors.find((m) => m._id === record.mentor).name}</td>
                  <td>
                    <small>{renderColum("createdAt", record.createdAt)}</small>
                  </td>

                  <td>
                    {renderColum("status", record.status)}
                    <hr />
                    {renderReportData(record._id)}
                  </td>
                  <td>
                    {record.status === 2 && (
                      <button onClick={() => confirmPayment(record._id)}>
                        確認匯款
                      </button>
                    )}
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

export default RecordListScreen;

const renderColum = (fieldName, data) => {
  let rtnString = "";

  switch (fieldName) {
    case "registerDate":
      rtnString = DateTime.fromISO(data).toLocaleString();
      break;
    case "createdAt":
      rtnString = DateTime.fromISO(data).toLocaleString(DateTime.DATETIME_MED);
      break;
    case "status":
      // console.log("status render");
      ///1-初始  2-已回報 4-已經確認 9 取消資格
      rtnString = caseStatus(data);
      break;
    default:
      rtnString = data;
      break;
  }

  return rtnString;
};

const caseStatus = (statusNum) => {
  let rtnString = "";
  switch (statusNum) {
    case 1:
      //console.log("status render", statusNum);
      rtnString = "初始";
      break;
    case 2:
      rtnString = <small className="text-danger">已回報</small>;
      break;
    case 4:
      rtnString = <small className="text-success">已經確認</small>;
      break;
    case 9:
      rtnString = "取消資格";
      break;

    default:
      rtnString = statusNum;
      break;
  }

  return rtnString;
};
