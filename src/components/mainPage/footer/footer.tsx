import { useSelector } from "react-redux";
import s from "./footer.module.css";
import { RootState } from "../../../store/store";

const Footer = () => {
    const footerHelpText: string = useSelector((state:RootState) => state.questions.footerHelpText);
    return <div className={s.footerDiv}>
        {footerHelpText}
    </div>
}

export default Footer;