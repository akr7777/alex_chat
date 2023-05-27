import s from "./header.module.css";
import UserName from "./userName";

const COMPANY_LC = "company";

const Header = () => {
    return <div className={s.headerDiv}>

        <div className={s.titleDiv}>
            TITLE
            <ul>
                <li>при авто выборе даты календарь работает неправтльно</li>
            </ul>
        </div>

        <UserName />

        
    </div>
}

export default Header;