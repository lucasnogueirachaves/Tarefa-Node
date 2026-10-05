import { messages } from "@/constants/messages.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { dailyHighlightsHtmlTemplate } from "@/templates/daily-highlights/daily-highlights-html.js";
import { dailyHighlightsTextTemplate } from "@/templates/daily-highlights/daily-highlights-text.js";
import type { GetDailyHighlightsUseCase } from "@/use-cases/report/get-daily-highlights.js";
import { sendEmail } from "@/utils/send-email.js";

interface SendDailyHighlightsEmailUseCaseResponse {
	highlightsCount: number;
	recipientsCount: number;
}

export class SendDailyHighlightsEmailUseCase {
	constructor(
		private getDailyHighlightsUseCase: GetDailyHighlightsUseCase,
		private usersRepository: UsersRepository,
	) {}

	async execute(): Promise<SendDailyHighlightsEmailUseCaseResponse> {
		const { posts } = await this.getDailyHighlightsUseCase.execute({
			limit: 5,
		});

		const users = await this.usersRepository.findMany();

		await Promise.all(
			users.map((user) =>
				sendEmail({
					to: user.email,
					subject: messages.email.dailyHighlightsSubject,
					message: dailyHighlightsTextTemplate(user.name, posts),
					html: dailyHighlightsHtmlTemplate(user.name, posts),
				}),
			),
		);

		return {
			highlightsCount: posts.length,
			recipientsCount: users.length,
		};
	}
}
