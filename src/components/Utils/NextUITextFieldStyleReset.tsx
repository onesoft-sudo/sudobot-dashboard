export default function NextUITextFieldStyleReset() {
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `
                form div:not([data-focus]) > div > label {
                    color: #999 !important;
                }
            `,
            }}
        />
    );
}
