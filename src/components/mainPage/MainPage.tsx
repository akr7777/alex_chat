import { useEffect } from 'react';
import s from './mainPage.module.css';
import BlockOne from '../block1/block1';
import BlockTwo from '../block2/block2';
import BlockThree from '../block3/blockThree';
import Header from './header/header';
import Footer from './footer/footer';

const MainPage = () => {

    useEffect( () => {
        // dispatch(getAnswerThunk());
    }, [])

    return <div className={s.wrappedDiv}>
        
        <Header />

        <div className={s.mainDiv}>
            <div className={s.blockDiv}>
                <BlockOne />
            </div>
            <div className={s.blockDiv}>
                <BlockTwo />
            </div>
            <div className={s.blockDiv}>
                <BlockThree />
            </div>
        </div>

        <Footer />
        
    </div>
}

export default MainPage;