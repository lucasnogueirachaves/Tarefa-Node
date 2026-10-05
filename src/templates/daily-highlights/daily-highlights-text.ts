import type { Post } from "@/repositories/posts-repository.js";

export function dailyHighlightsTextTemplate(
	userName: string,
	posts: Post[],
): string {
	if (!posts.length) {
		return `Olá, ${userName}!\n\nNenhum post recebeu curtidas nas últimas 24 horas.`;
	}

	const list = posts
		.map(
			(post, index) =>
				`${index + 1}. ${post.title} — por ${post.authorName} (${post.likes} curtidas)`,
		)
		.join("\n");

	return `Olá, ${userName}!

Aqui está o resumo dos posts que mais bombaram nas últimas 24 horas:

${list}

Este é um e-mail automático gerado pelo job diário de destaques.`;
}
