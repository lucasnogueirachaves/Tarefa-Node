import { PostsMockRepository } from "@/repositories/mock/posts-mock-repository.js";
import { GetDailyHighlightsUseCase } from "../report/get-daily-highlights.js";

export function makeGetDailyHighlightsUseCase() {
	const postsRepository = new PostsMockRepository();

	return new GetDailyHighlightsUseCase(postsRepository);
}
