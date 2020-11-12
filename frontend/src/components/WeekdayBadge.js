import React from "react";
import { Badge } from "react-bootstrap";
const WeekdayBadge = ({ dayNumber, styleClass = "ml-1" }) => {
  //   const weekdaysObject = {
  //     0: "Sunday",
  //     1: "Monday",
  //     2: "Tuesday",
  //     3: "Wednesday",
  //     4: "Thursday",
  //     5: "Friday",
  //     6: "Saturday",
  //   };

  const weekdaysObject = {
    0: "日",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
  };

  return (
    <Badge
      className={styleClass}
      variant={dayNumber === 0 ? "danger" : dayNumber === 6 ? "danger" : "info"}
    >
      {weekdaysObject[dayNumber].substring(0, 1)}
    </Badge>
  );
};

export default WeekdayBadge;
