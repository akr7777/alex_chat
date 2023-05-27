import { useState } from "react";
import { LineTextField } from "../../common/lineTextField/labelLineText";
import s from "./blockOne.module.css";

import closeIcon from '../../public/icons/delete_icon.png';
import saveIcon from '../../public/icons/save_icon.png';
import refreshIcon from '../../public/icons/refresh_icon.png';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { changeCompanyAC } from "../../store/features/questionSlice";

const CompanyField = () => {
    const dispatch = useAppDispatch();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const company: string = useSelector((state:RootState) => state.questions.company);
    const [newCompany, setNewCompany] = useState<string>(company);

    const onRefreshCompanyClickHandler = () => setIsEdit(true);
    const companyNameChangeHandler = (val: string) => setNewCompany(val);
    const onCloseClickHandler = () => {
        setNewCompany(company);
        setIsEdit(false);
    }
    const onSaveNewCompanyNameClickHandler = () => {
        dispatch(changeCompanyAC(newCompany));
        setIsEdit(false);
    }

    return <div className={s.companyDiv}>
        Название компании:

        {
            isEdit
                ? <div>
                    <LineTextField type={"text"} text={newCompany} onChangeFunction={(val) => companyNameChangeHandler(val)} />
                    <div>
                        <img alt="" src={saveIcon} className={s.companyIcons} onClick={onSaveNewCompanyNameClickHandler}/>
                        <img alt="" src={closeIcon} className={s.companyIcons} onClick={onCloseClickHandler}/>
                    </div>
                </div>
                : <div>
                    <label>{company}</label>
                    <img alt="" src={refreshIcon} className={s.companyIcons} onClick={onRefreshCompanyClickHandler}/>
                </div>
        }
        
    </div>
}

export default CompanyField;