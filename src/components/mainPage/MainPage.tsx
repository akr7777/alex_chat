import { useEffect } from 'react';
import s from './mainPage.module.css';
import BlockOne from '../block1/block1';
import BlockTwo from '../block2/block2';
import BlockThree from '../block3/blockThree';
import Header from './header/header';
import Footer from './footer/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const MainPage = () => {

    useEffect( () => {
        // dispatch(getAnswerThunk());
    }, [])

    const isFirstShort: boolean = useSelector((state: RootState) => state.questions.var.isFirstBlockShort);

    return <div className={s.wrappedDiv}>
        
        <Header />

        <div className={ isFirstShort ? s.mainDiv + " " + s.mainDivShort : s.mainDiv }>
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