import { useState } from "react";
import s from "./header.module.css";

const Header = () => {
    const userName: string = localStorage.getItem('username') || 'some user';
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const onSaveNewUserName = () => {

    }

    return <div className={s.headerDiv}>

        <div className={s.titleDiv}>
            <strong>TITLE</strong>
        </div>

        <div onClick={() => setIsEdit(!isEdit)} className={s.userNameDiv}>
            {
                isEdit
                    ? <input type="text" value={userName}/>
                    : <label>{userName}</label>
            }
        </div>
    </div>
}

export default Header;