import React, { useEffect, useState } from "react";

import { Form, Modal, Button, Badge, Row, Col, Card } from "react-bootstrap";

const TagManageModal = (props) => {
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState(props.tags.map((t) => t.name));
  const allTags = props.allTags || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmitTags(tags);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">標籤管理</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Col sm={12}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="請輸入標籤後按enter再按送出"
                value={newTag}
                className="mt-1"
                onChange={(e) => setNewTag(e.target.value.trim())}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    //console.log("enter press here! ");
                    e.stopPropagation();
                    e.preventDefault();

                    if (newTag !== "") {
                      setTags([...tags, newTag]);
                      setNewTag("");
                    }
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Card className="mt-1 mb-1">
            <Card.Body>
              {tags.map((t) => (
                <Badge
                  pill
                  variant="success"
                  className="ml-1"
                  onClick={() => setTags(tags.filter((tag) => tag !== t))}
                >
                  X {t}
                </Badge>
              ))}
            </Card.Body>
          </Card>
          <Button variant="primary" type="submit" block>
            送出
          </Button>
        </Form>
        {newTag !== "" && (
          <Button
            block
            variant="light"
            type="Button"
            onClick={() => {
              setTags([...tags, newTag]);
              setNewTag("");
            }}
          >
            新增「{newTag}」標籤
          </Button>
        )}

        <p className="mt-2 mb-2">
          <h6>所有標籤</h6>
          {allTags
            .filter((t) => tags.indexOf(t.name) < 0)
            .map((t) => {
              return (
                <Badge
                  pill
                  variant="secondary"
                  className="ml-1"
                  onClick={() => {
                    setTags([...tags, t.name]);
                  }}
                >
                  {t.name}
                </Badge>
              );
            })}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="mb-2 text-danger small block">
          👉 新增或移除標籤之後要按下［送出］才會套用變更喔！
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TagManageModal;
