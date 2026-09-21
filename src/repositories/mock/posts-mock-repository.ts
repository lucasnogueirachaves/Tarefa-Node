import type { Post, PostsRepository } from '@/repositories/posts-repository.js'

function buildMockPosts(): Post[] {
    const now = Date.now()
    const hoursAgo = (h: number) => new Date(now - h * 60 * 60 * 1000)

    return [
        { id: '1', title: 'Como organizar seu backlog em 2026', authorName: 'Ana Souza', likes: 128, createdAt: hoursAgo(2) },
        { id: '2', title: '5 dicas de produtividade para times remotos', authorName: 'Bruno Lima', likes: 342, createdAt: hoursAgo(6) },
        { id: '3', title: 'Clean Architecture na prática', authorName: 'Carla Dias', likes: 210, createdAt: hoursAgo(10) },
        { id: '4', title: 'Post antigo (fora da janela de 24h)', authorName: 'Diego Alves', likes: 999, createdAt: hoursAgo(30) },
        { id: '5', title: 'Automatizando relatórios com CRON', authorName: 'Elisa Reis', likes: 87, createdAt: hoursAgo(20) },
    ]
}

export class PostsMockRepository implements PostsRepository {
    private posts: Post[] = buildMockPosts()

    async findTopLikedInLastHours({ hours, limit }: { hours: number; limit: number }): Promise<Post[]> {
        const cutoff = Date.now() - hours * 60 * 60 * 1000

        return this.posts
            .filter((post) => post.createdAt.getTime() >= cutoff)
            .sort((a, b) => b.likes - a.likes)
            .slice(0, limit)
    }
}
