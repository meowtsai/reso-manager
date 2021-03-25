import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { socials } from "./quotesConfig";
import { DateTime } from "luxon";
const SocialDataCreateModal = ({
  show,
  handleClose,
  channelId,
  channelTitle,
  onCreateItem,
  error,
  success,
}) => {
  const curDate = DateTime.fromMillis(DateTime.fromISO(new Date()).ts).toFormat(
    "yyyy-MM-dd"
  );

  const [recordDate, setRecordDate] = useState(curDate);
  const [count, setCount] = useState(0);
  const [platform, setPlatform] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const validation = {};
    if (recordDate === "") {
      validation.recordDate = "請選擇日期";
    }
    if (platform === "") {
      validation.platform = "請選擇社交平台";
    }
    if (count === 0) {
      validation.count = "請輸入粉絲追蹤數";
    }

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const itemData = {
      date: recordDate,
      channel: channelId,
      platform,
      count,
    };

    onCreateItem(itemData);
  };

  useEffect(() => {
    return () => {
      setRecordDate(curDate);
      setCount(0);
      setPlatform("");
      setErrors({});
    };
  }, []);

  useEffect(() => {
    setRecordDate(curDate);
    setCount(0);
    setPlatform("");
    setErrors({});
  }, [success]);

  //日期  平台 粉絲數
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> {channelTitle} 社交平台追蹤紀錄新增</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="controlDate">
            <Form.Label>日期</Form.Label>
            <Form.Control
              inline="true"
              type="date"
              value={recordDate}
              onChange={(e) => setRecordDate(e.target.value)}
            />{" "}
            <Form.Control.Feedback type="invalid">
              {errors.recordDate}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="selectPlatform">
            <Form.Label>社交平台</Form.Label>
            <Form.Control
              as="select"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              isInvalid={errors.platform}
            >
              <option value="">--選擇--</option>
              {socials.map((platform) => (
                <option value={platform.id}>{platform.id}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.platform}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="controlCount">
            <Form.Label>粉絲追蹤數</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              placeholder="粉絲追蹤數"
              required
              value={count}
              onChange={(e) => setCount(Number.parseInt(e.target.value))}
              isInvalid={errors.count}
            />
            <Form.Control.Feedback type="invalid">
              {errors.count}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <span className="text-danger">{error}</span>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="primary" type="submit">
            送出
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SocialDataCreateModal;
