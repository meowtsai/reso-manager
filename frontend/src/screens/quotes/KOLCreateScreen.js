import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, InputGroup, Alert } from "react-bootstrap";
import { listCategories, createChannel } from "../../actions/quotesActions";
import FormContainer from "../../components/FormContainer";
import { socials } from "./quotesConfig";
const KOLCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const serviceCategoriesList = useSelector((state) => state.serviceCategories);
  const { loading, error, serviceCategories } = serviceCategoriesList;

  const channelCreate = useSelector((state) => state.channelCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    channel: newChannel,
  } = channelCreate;

  const [channelName, setChannelName] = useState("");
  const [area, setArea] = useState("");
  const [categories, setCategories] = useState([]);
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitch, setTwitch] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [intro, setIntro] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userInfo) {
      dispatch(listCategories());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const validation = {};
    if (channelName === "") {
      validation.channelName = "請輸入頻道名稱";
    }
    if (area === "") {
      validation.area = "請選擇地區";
    }

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const data = {
      title: channelName,
      area,
      intro,
      note,
      socials: {
        youtube,
        facebook,
        instagram,
        twitch,
        tiktok,
      },
      categories,
    };
    console.log(data);
    dispatch(createChannel(data));
  };

  const getSelectedCategories = (d) => {
    return categories.indexOf(d) > -1 === true ? "true" : "";
  };

  console.log(errors);

  if (newChannel) {
    return (
      <Alert variant="success">
        頻道名稱{newChannel.title}新增成功
        <Alert.Link href="/quotes/kol/list">回到列表頁面</Alert.Link>.
      </Alert>
    );
  }
  return (
    <>
      <Link to="/quotes/kol/list" className="btn btn-light my-3">
        回列表
      </Link>
      <FormContainer>
        <h1>新增KOL</h1>
        <Form onSubmit={submitHandler}>
          <hr />

          <Form.Group className="mb-4">
            <Form.Label>頻道名稱</Form.Label>
            <Form.Control
              type="text"
              id="channelName"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              isInvalid={errors.channelName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.channelName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>地區</Form.Label>
            <Form.Control
              id="area"
              as="select"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">選擇地區</option>
              <option value="TW">台灣</option>
              <option value="HK">香港</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>類型</Form.Label>
            <Form.Row>
              {serviceCategories.map((d) => (
                <Fragment key={`catefrag-${d._id}`}>
                  <Form.Check
                    className="mr-0 ml-1"
                    inline="true"
                    type={"checkbox"}
                    id={`custom-checkbox${d._id}`}
                    aria-label={`cate-${d._id}`}
                    key={`catecheckbox-${d._id}`}
                    checked={categories.indexOf(d.key) > -1}
                    onChange={(e) =>
                      e.target.checked
                        ? setCategories([...categories, d.key])
                        : setCategories(categories.filter((wd) => wd !== d.key))
                    }
                  />
                  {d.cht}
                </Fragment>
              ))}
            </Form.Row>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>簡介</Form.Label>

            <Form.Control
              as="textarea"
              id="intro"
              value={intro}
              rows={8}
              onChange={(e) => setIntro(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>平台資料</Form.Label>
            <InputGroup className="mt-1">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fab fa-youtube mr-2"></i>
                  {"  "}
                  https://www.youtube.com/channel/
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                id="youtube"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                isInvalid={errors.youtube}
              />
              <Form.Control.Feedback type="invalid">
                {errors.youtube}
              </Form.Control.Feedback>
            </InputGroup>

            <InputGroup className="mt-1">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fab fa-facebook mr-2"></i>
                  https://www.facebook.com/
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                isInvalid={errors.facebook}
              />
              <Form.Control.Feedback type="invalid">
                {errors.facebook}
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mt-1">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fab fa-instagram mr-2"></i>
                  https://www.instagram.com/
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                isInvalid={errors.instagram}
              />
              <Form.Control.Feedback type="invalid">
                {errors.instagram}
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mt-1">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fab fa-twitch mr-2"></i>
                  https://www.twitch.tv/
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                id="twitch"
                value={twitch}
                onChange={(e) => setTwitch(e.target.value)}
                isInvalid={errors.twitch}
              />
              <Form.Control.Feedback type="invalid">
                {errors.twitch}
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mt-1">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fab fa-tiktok mr-2"></i>
                  https://www.tiktok.com/
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                id="tiktok"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                isInvalid={errors.tiktok}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tiktok}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>備註</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            送出
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default KOLCreateScreen;

// youtube: { type: String },
// facebook: { type: String },
// instagram: { type: String },
// twitch: { type: String },
// tiktok: { type: String },
