import uniqid from "uniqid";
import md5  from "md5";


const setFilename = () => md5(uniqid());

export default setFilename;