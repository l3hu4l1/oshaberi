interface User {
    id: number;
    username: string;
}

type Comment = {
    id: number;
    content: string;
    user: UserProps;
    created_at: string;
    user: User;
}

export default Comment;
