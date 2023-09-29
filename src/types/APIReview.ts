export interface APIReview {
    id: number;
    reviewer?: string;
    content: string;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    aboutReviewer?: string;
}
