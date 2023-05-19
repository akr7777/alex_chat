import s from "./header.module.css";

import UserName from "./userName";
import CompanyName from "./companyName";


const COMPANY_LC = "company";

const Header = () => {
    return <div className={s.headerDiv}>

        <div className={s.titleDiv}>
            TITLE
        </div>

        <UserName />

        <CompanyName />
        
    </div>
}

export default Header;