import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";

import Meta from "../components/Meta";

const HomeScreen = ({ match }) => {
  return (
    <>
      <Meta />
    </>
  );
};

export default HomeScreen;
