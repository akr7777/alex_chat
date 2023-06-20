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

const FieldsSwitcher = () => {
    const dispatch = useAppDispatch();
    const workspaceList: Array<Workspace> = useSelector((state:RootState) => state.questions.workspaceList);
    // const currentWorkspaceId: string = useSelector((state:RootState) => state.questions.currentWorkspaceId);
    // const currentWorkspaceName: string = useSelector((state:RootState) => state.questions.currentWorkspaceName);
    const currentWorkspaceId: string = workspaceList.find(el => el.initial === true)?.id || "";
    const currentWorkspaceName: string = workspaceList.find(el => el.initial === true)?.title || "";
    
    const [editField, setEditField] = useState<boolean>(false);
    // console.log('currentWorkspaceName=', currentWorkspaceName);
    const [newFieldName, setNewFiledName] = useState<string>(currentWorkspaceName);
    
    // console.log('newFieldName=', newFieldName);
    const listToDelete:Array<Workspace> = workspaceList.filter(el => el.initial === false);
    const [wsIdToDelete, setWsIdToDelete] = useState<string>('');
    // setNewFiledName(currentWorkspaceName);
    useEffect(() => {
        setTimeout(() => {
            //waiting for const currentWorkspaceName: string = workspaceList.find
            setNewFiledName(currentWorkspaceName);
            if (listToDelete.length > 0)
                setWsIdToDelete(listToDelete[0].id)
        }, 500)
    }, [])
    

    // console.log('wsIdToDelete=', wsIdToDelete);
    
    useEffect(() => {
        dispatch(getWorkspaceThunk());
    }, [])

    const onChangeWorkSpaceClickHandler = (newValue: string) => {
        dispatch(putWorkspaceThunk(newValue));
        dispatch(getPromtThunk);
        dispatch(getQuestionsThunk);
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
        setNewFiledName(currentWorkspaceName);
        setEditField(false);
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
            alert('Область '+ newName + 'добавлена!')
        }
    }
    const onDeleteClickHandler = () => {
        // const wsTitle: string = listToDelete.find(el => el.id===id)?.title || "";
        if (wsIdToDelete && wsIdToDelete.length>0) {
            const answer: boolean = window.confirm('Уверены, что хотите удалить область?');
            if (answer) {
                dispatch(deleteWorkspaceThunk(wsIdToDelete));
            }
        }
    }
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
            onChangeFunction={(newValue: string) => onChangeWorkSpaceClickHandler(newValue)}        
        />
        <img alt="" src={editIcon} 
            onClick={ () => setEditField(true) } 
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
                                onClick={onOkClickHandler} 
                                className={s.iconImg2}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Применить изменения область"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
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


                        <div className={s.oneButtonDiv}>
                            <OptionSwitcher 
                                options={listToDelete.map(el => {
                                return { value: el.id, text: el.title }
                                })}
                                checkedOption={wsIdToDelete} 
                                onChangeFunction={(newVal: string) => setWsIdToDelete(newVal)}
                                // onChangeFunction={(newValue: string) => onDeleteClickHandler(newValue)}
                                // onChangeFunction={(newValue: string) => onChangeWorkSpaceClickHandler(newValue)}        
                            />
                            <img alt="" src={removeIcon} 
                                onClick={onDeleteClickHandler} 
                                className={s.iconImg2}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Удалить область"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                        </div>
                        
                        
                    </div>
                    

                    {/* <div>
                        <div className={s.oneButtonDiv}>
                            <OptionSwitcher 
                                options={workspaceList.map(el => {
                                return { value: el.id, text: el.title }
                                })}
                                checkedOption={currentWorkspaceId} 
                                onChangeFunction={(newValue: string) => onChangeWorkSpaceClickHandler(newValue)}        
                            />
                            <img alt="" src={removeIcon} 
                                onClick={onDeleteClickHandler} 
                                className={s.iconImg2}
                                onMouseOver={() => dispatch(changeFooterHelpTextAC("Удалить область"))}
                                onMouseLeave={() => dispatch(changeFooterHelpTextAC(""))}
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        }


    </>
}

export default FieldsSwitcher;