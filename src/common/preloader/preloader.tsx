import s from "./preloader.module.css";

const Preloader = () => {
    return <>
        <center>
            <label className={s.preloader}>Загрузка...</label>
        </center>
    </>
}

export default Preloader;