import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { SendDailyHighlightsEmailUseCase } from "../jobs/send-daily-highlights-email.js";
import { makeGetDailyHighlightsUseCase } from "./make-get-daily-highlights-use-case.js";

export function makeSendDailyHighlightsEmailUseCase() {
	const usersRepository = new PrismaUserRepository();

	const getDailyHighlightsUseCase = makeGetDailyHighlightsUseCase();

	return new SendDailyHighlightsEmailUseCase(
		getDailyHighlightsUseCase,
		usersRepository,
	);
}
