import type { Post, PostsRepository } from "@/repositories/posts-repository.js";

interface GetDailyHighlightsUseCaseRequest {
	limit?: number;
}

interface GetDailyHighlightsUseCaseResponse {
	posts: Post[];
}

export class GetDailyHighlightsUseCase {
	constructor(private postsRepository: PostsRepository) {}

	async execute({
		limit = 5,
	}: GetDailyHighlightsUseCaseRequest = {}): Promise<GetDailyHighlightsUseCaseResponse> {
		const posts = await this.postsRepository.findTopLikedInLastHours({
			hours: 24,
			limit,
		});

		return { posts };
	}
}
