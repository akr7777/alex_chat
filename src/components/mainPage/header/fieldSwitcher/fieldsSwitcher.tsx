import { useSelector } from 'react-redux';
import OptionSwitcher from '../../../../common/optionSwitcher/optionSwitcher';
import s from '../header.module.css';
import { RootState, useAppDispatch } from '../../../../store/store';
import editIcon from '../../../../public/icons/edit_icon_2.png';
import okIcon from '../../../../public/icons/ok_icon.png';
import okIconDisabled from '../../../../public/icons/ok_icon_disabled.png';
import cancelIcon from '../../../../public/icons/cancel_icon.png';
import removeIcon from '../../../../public/icons/remove_icon_1.png';
import plusIcon from '../../../../public/icons/plus_icon.png';
import crossIcon from '../../../../public/icons/cross_icon.png';

import { changeFooterHelpTextAC } from '../../../../store/features/questionSlice';
import { LineTextField } from '../../../../common/lineTextField/labelLineText';
import { useEffect, useState } from 'react';
import { Workspace } from '../../../../store/features/questionTypes';
import { PostWorkspaceThunkPropsType, deleteWorkspaceThunk, getPromtThunk, getQuestionsThunk, getWorkspaceThunk, postWorkspaceThunk, putWorkspaceThunk } from '../../../../store/features/questionThunk';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import Preloader from '../../../../common/preloader/preloader';

const FieldsSwitcher = () => {
    const dispatch = useAppDispatch();
    const workspaceList: Array<Workspace> = useSelector((state:RootState) => state.questions.workspaceList);
    
    const currentWorkspaceId: string = workspaceList.find(el => el.initial === true)?.id || "";
    const currentWorkspaceName: string = workspaceList.find(el => el.initial === true)?.title || "noData";
    const [newFieldName, setNewFiledName] = useState<string>('');

    const [editField, setEditField] = useState<boolean>(false);
    const listToDelete:Array<Workspace> = workspaceList.filter(el => el.initial === false);
    const [wsIdToDelete, setWsIdToDelete] = useState<string>('');
    const isLoading: boolean = useSelector((state: RootState) => state.questions.varLoading.workspaceLoading);

    useEffect(() => {
        dispatch(getWorkspaceThunk());
    }, [])
    useEffect(() => {
        setNewFiledName(currentWorkspaceName);
    }, [currentWorkspaceName, currentWorkspaceId]);
    useEffect(() => {
        setWsIdToDelete(listToDelete[0]?.id || "");
    }, [listToDelete])

    const onChangeWorkSpaceClickHandler = (newValue: string) => {
        dispatch(putWorkspaceThunk(newValue));
    }
    const onOkClickHandler = () => {
        if (newFieldName && newFieldName.length > 0) {
            const data:PostWorkspaceThunkPropsType = {
                id: currentWorkspaceId,
                title: newFieldName,
            }
            dispatch(postWorkspaceThunk(data));
            setEditField(false);
        }
    }
    const onCancelButtonClickHandler = () => {
        // setNewFiledName(currentWorkspaceName);
        setNewFiledName('');
        setEditField(false);
    }
    const onDisabledOkClickHandler = () => {
        toast.error('Введите название новой области!');
    }
    const onAddNewWorkSpaceClickHandler = () => {
        const newName: string | null = prompt('Введите название нового WorkSpace:');
        if (newName && newName.length > 0) {
            const data:PostWorkspaceThunkPropsType = {
                id: v4(),
                title: newName
            }
            dispatch(postWorkspaceThunk(data));
            setEditField(false);
            alert('Область '+ newName + ' добавлена!')
        }
    }
    const onDeleteClickHandler = () => {
        if (wsIdToDelete && wsIdToDelete.length>0) {
            const answer: boolean = window.confirm('Уверены, что хотите удалить выбранную область?');
            if (answer) {
                dispatch(deleteWorkspaceThunk(wsIdToDelete));
            }
        }
    }
    return <>

        {
            isLoading
                ? <Preloader/>
                : <>
                    <OptionSwitcher 
                        options={workspaceList.map(el => {
                        return { value: el.id, text: el.title }
                        })}
                        checkedOption={currentWorkspaceId} 
                        onChangeFunction={(newValue: string) => onChangeWorkSpaceClickHandler(newValue)}        
                    />
                    <img alt="" src={editIcon} 
                        onClick={ () => setEditField(true) } 
                        className={s.iconImg}
                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Редактировать область"))}
                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                    />    
                </>
        }
        
        {
            editField && <div className={s.darkLayout}>
                <div className={s.editFieldDiv}>

                    <img alt="" src={crossIcon} 
                        onClick={onCancelButtonClickHandler} 
                        className={s.crossImgIcon}
                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Отклонить изменения область"))}
                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                    />

                    <label>Редактирование текущей области</label>
                    <div>
                        <label>Новое название:</label>
                        <LineTextField 
                            type={'text'} 
                            text={newFieldName} 
                            onChangeFunction={(newVal: string) => setNewFiledName(newVal)} 
                        />
                    </div>
                    
                    <div className={s.editFieldButtonsDiv}>
                        <div className={s.oneButtonDiv}>
                            {
                                newFieldName.length > 0
                                    ? <img alt="" src={okIcon} 
                                        onClick={onOkClickHandler} 
                                        className={s.iconImg2}
                                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Применить изменения область"))}
                                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                                    />
                                    : <img alt="" src={okIconDisabled} 
                                        onClick={onDisabledOkClickHandler} 
                                        className={s.iconImg2}
                                        onMouseOver={() => dispatch(changeFooterHelpTextAC("Применить изменения область"))}
                                        onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                                    />
                            }
                        </div>
                        <div className={s.oneButtonDiv}>
                            <img alt="" src={cancelIcon} 
                                onClick={onCancelButtonClickHandler} 
                                className={s.iconImg2}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Отклонить изменения область"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                        </div>
                        
                        <div className={s.oneButtonDiv}>
                            <img alt="" src={plusIcon} 
                                onClick={onAddNewWorkSpaceClickHandler} 
                                className={s.iconImg2}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Добавить новую область"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                        </div>

                        {/* Удаление workspace */}
                        <div className={s.oneButtonDiv}>
                            <OptionSwitcher 
                                options={listToDelete.map(el => {
                                return { value: el.id, text: el.title }
                                })}
                                // checkedOption={wsIdToDelete} 
                                onChangeFunction={(newVal: string) => setWsIdToDelete(newVal)}
                            />
                            <img alt="" src={removeIcon} 
                                onClick={onDeleteClickHandler} 
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