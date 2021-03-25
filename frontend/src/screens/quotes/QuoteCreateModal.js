import React, { useEffect, useState } from "react";

import { Modal, Form, Button, Alert } from "react-bootstrap";
import { DateTime } from "luxon";
const QuoteCreateModal = ({
  show,
  handleClose,
  channelId,
  channelTitle,
  quoteItems,
  onCreateItem,
  error,
  success,
}) => {
  const curDate = DateTime.fromMillis(DateTime.fromISO(new Date()).ts).toFormat(
    "yyyy-MM-dd"
  );

  const [recordDate, setRecordDate] = useState(curDate);
  const [item, setItem] = useState("");
  const [note, setNote] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const validation = {};
    if (recordDate === "") {
      validation.recordDate = "請選擇日期";
    }
    if (item === "") {
      validation.item = "請選擇項目";
    }
    if (purchasePrice === 0) {
      validation.purchasePrice = "請輸入採購價";
    }

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const itemData = {
      date: recordDate,
      channel: channelId,
      item,
      note,
      purchasePrice,
    };
    if (marketPrice !== 0) {
      itemData.marketPrice = marketPrice;
    }

    console.log(itemData);
    onCreateItem(itemData);
  };

  useEffect(() => {
    if (success) {
      setRecordDate(curDate);
      setItem("");
      setNote("");
      setPurchasePrice(0);
      setMarketPrice(0);
      setErrors({});
    }
  }, [success]);

  //項目	採購價	市場價 備註
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> {channelTitle} 報價紀錄維護</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="controlPurchasePrice">
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

          <Form.Group controlId="selectItem">
            <Form.Label>項目</Form.Label>
            <Form.Control
              as="select"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              isInvalid={errors.item}
            >
              <option value="">--選擇報價項目--</option>
              {quoteItems.map((item) => (
                <option value={item._id}>
                  {item.name}({item.platform})
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.item}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="controlPurchasePrice">
            <Form.Label>採購價</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              placeholder="採購價"
              required
              value={purchasePrice}
              onChange={(e) =>
                setPurchasePrice(Number.parseInt(e.target.value))
              }
              isInvalid={errors.purchasePrice}
            />
            <Form.Control.Feedback type="invalid">
              {errors.purchasePrice}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="controlMarketPrice">
            <Form.Label>市場價</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              placeholder="市場價"
              value={marketPrice}
              onChange={(e) => setMarketPrice(Number.parseInt(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="controlNote">
            <Form.Label>備註</Form.Label>
            <Form.Control
              value={note}
              onChange={(e) => setNote(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {error && <Alert variant="danger">{error}</Alert>}
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

export default QuoteCreateModal;
