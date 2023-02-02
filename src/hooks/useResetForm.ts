export default function useResetForm(reset?: Function) {
    return function(e: MouseEvent) {
        reset ? reset() : null;
        (e.currentTarget! as any).disabled = true;
        location.reload();
    };
}