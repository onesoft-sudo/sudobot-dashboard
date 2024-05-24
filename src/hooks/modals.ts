import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { ModalSliceState, close as modalClose, open as modalOpen } from "@/redux/slice/ModalSlice";

export const useModalControls = (id: keyof ModalSliceState) => {
    const dispatch = useAppDispatch();
    const open = () => {
        dispatch(modalOpen(id));
    };
    const close = () => {
        dispatch(modalClose(id));
    };

    return {
        open,
        close,
    };
};

export const useModalState = (id: keyof ModalSliceState) => {
    return useAppSelector((state) => state.modals[id]);
};

export const useModal = (id: keyof ModalSliceState) => {
    return {
        ...useModalControls(id),
        isOpen: useModalState(id),
    };
};
