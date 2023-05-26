import s from "./header.module.css";
import UserName from "./userName";

const COMPANY_LC = "company";

const Header = () => {
    return <div className={s.headerDiv}>

        <div className={s.titleDiv}>
            TITLE
            <ul>
                <li>добавить кнопку добавить вопрос в блоке 1</li>
                <li>заменить кнопку сохранить в блоке 2 на черную</li>
                <li>при авто выборе даты календарь работает неправтльно</li>
            </ul>
        </div>

        <UserName />

        
    </div>
}

export default Header;