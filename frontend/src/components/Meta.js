import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "歡迎使用呼聲平台",
  description:
    "人人都是粉絲和專家,每個關鍵的聲音都值得被聆聽. 與我們聯繫,讓你被聽見!",
  keywords: "KOL,網紅,遊戲,直播,行銷,活動",
};

export default Meta;
