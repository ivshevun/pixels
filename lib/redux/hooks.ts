import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// create redux hooks that have type safety be default

// a hook, that returns AppDispatch
export function useAppDispatch(): AppDispatch {
  return useDispatch();
}

// a typed useSelector hook
export function useAppSelector(): TypedUseSelectorHook<RootState> {
  return useSelector;
}


