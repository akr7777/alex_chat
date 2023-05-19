import s from './header.module.css';
import { useState } from "react";
import refreshIcon from "./../../../public/icons/refresh_red_icon.png";
import crossIcon from "./../../../public/icons/cross_icon.png";

const COMPANY_NAME = 'company_name';

const CompanyName = () => {
    const companyName: string = localStorage.getItem(COMPANY_NAME) || "some company";
    const [companyEdit, setCompanyEdit] = useState<boolean>(false);
    // const companyName: string = useSelector((state: RootState) => state.questions.companyName);
    const [newCompany, setNewCompany] = useState<string>(companyName);

    const onSaveNewUserName = () => {
        localStorage.setItem(COMPANY_NAME, newCompany);
        setCompanyEdit(false);
    }
    const onCancelClickHandler = () => {
        setCompanyEdit(false);
        setNewCompany(newCompany);
    }

    return <div className={s.VarNameCompanyDiv}>
        {
            companyEdit
                ?   <>
                        <input type="text" value={newCompany} onChange={(e) => setNewCompany(e.currentTarget.value)}/>
                        <img alt="" src={refreshIcon} onClick={onSaveNewUserName} className={s.iconImg} />
                        <img alt="" src={crossIcon} onClick={onCancelClickHandler} className={s.iconImg} />
                    </>
                :   <label onClick={() => setCompanyEdit(true)} className={s.varLabel}>{companyName}</label>
        }
    </div>
}

export default CompanyName;