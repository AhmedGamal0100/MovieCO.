export interface IMovieDetailsReview {
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path: string;
        rating: number | null;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}