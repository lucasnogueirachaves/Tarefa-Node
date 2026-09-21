export interface Post {
    id: string
    title: string
    authorName: string
    likes: number
    createdAt: Date
}

export interface PostsRepository {
    findTopLikedInLastHours(params: {
        hours: number
        limit: number
    }): Promise<Post[]>
}
