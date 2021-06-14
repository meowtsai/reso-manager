import React from "react";
import { Container, Row, Col,Image} from "react-bootstrap";


const Avatar = ({thumbnails}) => {
    if (thumbnails) {
        return <Image
        src={thumbnails}
        roundedCircle
        style={{width:"50px",height:"50px"}}
      />
    } else {
       return <i className="fas fa-user-alt img-placeholder"></i>
    };
};

export default Avatar;