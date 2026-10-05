import cron from "node-cron";
import { env } from "@/env/index.js";
import { makeSendDailyHighlightsEmailUseCase } from "@/use-cases/factories/make-send-daily-highlights-email-use-case.js";

export function scheduleDailyHighlightsJob() {
	if (!cron.validate(env.CRON_SCHEDULE)) {
		console.error(
			`[jobs] CRON_SCHEDULE inválido: "${env.CRON_SCHEDULE}". Job não foi agendado.`,
		);
		return;
	}

	cron.schedule(env.CRON_SCHEDULE, async () => {
		console.log(
			`[jobs] Iniciando job "daily-highlights" (${new Date().toISOString()})`,
		);

		try {
			const sendDailyHighlightsEmailUseCase =
				makeSendDailyHighlightsEmailUseCase();

			const { highlightsCount, recipientsCount } =
				await sendDailyHighlightsEmailUseCase.execute();

			console.log(
				`[jobs] "daily-highlights" concluído: ${highlightsCount} destaque(s) enviado(s) para ${recipientsCount} usuário(s).`,
			);
		} catch (error) {
			console.error('[jobs] Erro ao executar "daily-highlights":', error);
		}
	});

	console.log(
		`[jobs] Job "daily-highlights" agendado com a expressão CRON "${env.CRON_SCHEDULE}"`,
	);
}
