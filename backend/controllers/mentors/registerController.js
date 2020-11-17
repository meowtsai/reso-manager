import asyncHandler from "express-async-handler";
import sgMail from "@sendgrid/mail";
import { DateTime } from "luxon";
import fs from "fs";
import path from "path";
import Course from "../../models/mentors/CourseModel.js ";
import Mentor from "../../models/mentors/MentorModel.js ";
import MentorCourseRegister from "../../models/mentors/MentorCourseRegister.js";
import MentorCourseWireReport from "../../models/mentors/MentorCourseWireReport.js";

// @desc    Get all mentor course register record
// @route   GET /api/mentors/games
// @access  Private/Admin
const getRegisters = asyncHandler(async (req, res) => {
  //console.log("getRegisters called");
  const registers = await MentorCourseRegister.find({}).populate(
    "mentorcoursewirereports"
  );
  const games = await Course.find({});
  const mentors = await Mentor.find({});
  const wirereports = await MentorCourseWireReport.find({});
  //console.log(registers);
  //res.json({ msg: "hi" });

  res.json({ games, mentors, registers, wirereports });
});

const updateRegister = asyncHandler(async (req, res) => {
  const registerId = req.params.id;
  const criteria = req.body;

  // const result = await MentorCourseRegister.findOne({
  //   _id: criteria._id,
  //   status: 2,
  // });

  // res.json(result);

  try {
    //console.log("updateRegister result", criteria._id);
    const result = await MentorCourseRegister.findByIdAndUpdate(
      { _id: registerId },
      { status: 4 }
    );

    if (result) {
      const mentorFull = await Mentor.findById(result.mentor, {
        name: 1,
        email: 1,
        wireInfo: 1,
      });
      const game = await Course.findOne(
        { courses: { $elemMatch: { _id: result.course } } },
        { courses: 1, gameName: 1, rolefield: 1, detail: 1 }
      );
      const courseFull = game.courses.filter(
        (c) => c._id.toString() === result.course.toString()
      )[0];

      sendMailConfirmed({ ...result._doc, mentorFull, courseFull, game });

      res.json({ ...result._doc, status: 4 });
    } else {
      res.status(500).json({ error: "未更新" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export { getRegisters, updateRegister };

const sendMailConfirmed = (record) => {
  console.log("sendMailConfirmed", record);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const __dirname = path.dirname(import.meta.url).replace(/^file:\/\/\//, ""); // can be usefull

  let html_template = fs.readFileSync(__dirname + "/mailTemplate.html", "utf8");

  const notes = Object.keys(record.game.detail.steps)
    .map((stepKey) => `<li>${record.game.detail.steps[stepKey]}</li>`)
    .join("");
  const msg = `您已經成功報名${record.mentorFull.name}的${
    record.courseFull.title
  } ${record.courseFull.desc}教學課程，以下為課程時間與資訊<br />
    您的預約日期和時段: ${DateTime.fromISO(
      record.registerDate
    ).toLocaleString()}
      
    ${record.timeSlot} <br />
    discord帳號:${record.discordAccount}<br />
    姓名:${record.name}<br />
    手機:${record.phone}<br />
    email:${record.email}<br /><br />
    ${record.game.rolefield}  :${record.roleData1}<br />
    角色資料2:${record.roleData2}<br />
    
    <hr />
    課程${record.courseFull.title}- ${record.courseFull.desc}
    <br />
    提醒您，課前務必準備好：<br />
    <br />
    <ul> 

  ${notes}
    
    </ul>
<br />
最後，記得準時上課喔<br />
<br />
<br />
${record.mentorFull.name}教練<br />
    `;

  html_template = html_template
    .replace("{{msg}}", msg)
    .replace("{{name}}", record.name);

  const mailContent = {
    //to: record.email,
    to: `${record.name}<shihfan.tsai@gmail.com>`,
    // bcc: CONFIG.cclist.map((email) => ({
    //   email,
    // })),
    from: `${record.mentorFull.name}<${record.mentorFull.email}>`,
    subject: `${record.mentorFull.name}帶練${record.courseFull.title}課程匯款確認及上課注意事項通知`,
    html: html_template,
  };

  //console.log("mailContent", mailContent);
  sgMail.send(mailContent).then(
    (sendResult) => {
      //console.log(" sendMailConfirmed mail send result", sendResult);
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
