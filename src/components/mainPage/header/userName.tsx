import s from "./header.module.css";
import { useState } from "react";
import refreshIcon from "./../../../public/icons/refresh_red_icon.png";
import crossIcon from "./../../../public/icons/cross_icon.png";

const USER_NAME_LC = 'username';

const UserName = () => {

    const userName: string = localStorage.getItem(USER_NAME_LC) || 'some user';
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<string>(userName);

    const onSaveNewUserName = () => {
        localStorage.setItem(USER_NAME_LC, newUser);
        setIsEdit(false);
    }
    const onCancelClickHandler = () => {
        setIsEdit(false);
        setNewUser(userName);
    }

    return <div className={s.VarNameCompanyDiv}>
        {
            isEdit
                ?   <>
                        <input type="text" value={newUser} onChange={(e) => setNewUser(e.currentTarget.value)}/>
                        <img alt="" src={refreshIcon} onClick={onSaveNewUserName} className={s.iconImg} />
                        <img alt="" src={crossIcon} onClick={onCancelClickHandler} className={s.iconImg} />
                    </>
                :   <label onClick={() => setIsEdit(true)} className={s.varLabel}>{userName}</label>
        }
    </div>
}

export default UserName;