export interface APIAttachment {
    attachment: string;
    url: string;
    proxyURL: string;
    name: string;
    id: string;
    size: number;
    height?: number;
    width?: number;
    flags: number;
    contentType: string;
    description?: string | null;
    ephemeral: boolean;
    duration?: number | null;
    waveform?: number | null;
}
