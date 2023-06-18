import { useSelector } from 'react-redux';
import OptionSwitcher from '../../../common/optionSwitcher/optionSwitcher';
import s from './header.module.css';
import { RootState, useAppDispatch } from '../../../store/store';
import editIcon from '../../../public/icons/edit_icon_2.png';
import okIcon from '../../../public/icons/ok_icon.png';
import okIconDisabled from '../../../public/icons/ok_icon_disabled.png';
import cancelIcon from '../../../public/icons/cancel_icon.png';
import removeIcon from '../../../public/icons/remove_icon_1.png';
import plusIcon from '../../../public/icons/plus_icon.png';
import crossIcon from '../../../public/icons/cross_icon.png';

import { changeFooterHelpTextAC } from '../../../store/features/questionSlice';
import { LineTextField } from '../../../common/lineTextField/labelLineText';
import { useEffect, useState } from 'react';
import { Workspace } from '../../../store/features/questionTypes';
import { getWorkspaceThunk } from '../../../store/features/questionThunk';

const FieldsSwitcher = () => {
    const dispatch = useAppDispatch();
    const workspaceList: Array<Workspace> = useSelector((state:RootState) => state.questions.workspaceList);
    const currentWorkspaceId: string = useSelector((state:RootState) => state.questions.currentWorkspaceId);
    // const currentWorkspaceName: string = workspaceList.find(el => el.id === currentWorkspaceId)?.name || "";
    const [editField, setEditField] = useState<boolean>(false);
    const [newFieldName, setNewFiledName] = useState<string>(currentWorkspaceId);

    useEffect(() => {
        dispatch(getWorkspaceThunk());
    }, [])

    return <>

        {/* <img alt="" src={crossIcon} 
            onClick={ () => setEditField(true) } 
            className={s.crossImgIcon}
            onMouseOver={() => dispatch(changeFooterHelpTextAC("Редактировать область"))}
            onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
        /> */}
        <OptionSwitcher 
            options={workspaceList.map(el => {
               return { value: el.id, text: el.title }
            })}
            checkedOption={currentWorkspaceId} 
            onChangeFunction={(newValue: string)=>{ alert('Выбрано: '+newValue) }}        
        />
        <img alt="" src={editIcon} 
            // onClick={ () => setEditField(true) } 
            className={s.iconImg}
            onMouseOver={() => dispatch(changeFooterHelpTextAC("Редактировать область"))}
            onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
        />



        {
            editField && <div className={s.darkLayout}>
                <div className={s.editFieldDiv}>
                    <label>Название:</label>
                    <LineTextField 
                        type={'text'} 
                        text={newFieldName} 
                        onChangeFunction={(newVal: string) => setNewFiledName(newVal)} 
                    />
                    <div className={s.editFieldButtonsDiv}>
                        <div className={s.oneButtonDiv}>
                            <img alt="" src={okIcon} 
                                // onClick={ () => setEditField(true) } 
                                className={s.iconImg2}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Применить изменения область"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                        </div>
                        <div className={s.oneButtonDiv}>
                            <img alt="" src={cancelIcon} 
                                // onClick={ () => setEditField(true) } 
                                className={s.iconImg2}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Отклонить изменения область"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                        </div>
                        <div>

                        </div>
                        <div className={s.oneButtonDiv}>
                            <img alt="" src={plusIcon} 
                                // onClick={ () => setEditField(true) } 
                                className={s.iconImg2}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Добавить новую область"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                        </div>
                        <div className={s.oneButtonDiv}>
                            <img alt="" src={removeIcon} 
                                // onClick={ () => setEditField(true) } 
                                className={s.iconImg2}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Удалить область"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        }


    </>
}

export default FieldsSwitcher;