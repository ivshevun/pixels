/* eslint-disable react-hooks/rules-of-hooks */
import {
  changeAlign,
  changeFont,
  changeModifiers,
} from "../features/shotInfo/shotSlice";
import { AppDispatch } from "../store";


export const handleChangeFont = (font: string, dispatch: AppDispatch) => {
  dispatch(changeFont(font));
};

export const handleChangeModifiers = (modifiers: string[], dispatch: AppDispatch) => {
  dispatch(changeModifiers(modifiers));
};

export const handleChangeAlign = (align: string, dispatch: AppDispatch) => {
  dispatch(changeAlign(align));
};
