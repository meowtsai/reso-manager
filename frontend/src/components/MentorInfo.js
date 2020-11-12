import React from "react";

const MentorInfo = ({ mentor }) => {
  return (
    <>
      <img
        src={`https://www.resound.global${mentor.img}`}
        alt={`${mentor.name}`}
        title={`${mentor.name}`}
        height="72"
        className="align-top rounded mr-3"
      />
      <p className="d-inline-block">
        {mentor.name}
        <br />
        {mentor.email}
        <br />
        {mentor.socials?.youtube && (
          <i className="fab fa-youtube text-danger ml-1"></i>
        )}
        {mentor.socials?.instagram && (
          <i className="fab fa-instagram  text-pink ml-1"></i>
        )}
        {mentor.socials?.facebook && (
          <i className="fab fa-facebook  text-info ml-1"></i>
        )}
        {mentor.socials?.twitch && (
          <i className="fab fa-twitch  text-purple ml-1"></i>
        )}
      </p>
    </>
  );
};

export default MentorInfo;
