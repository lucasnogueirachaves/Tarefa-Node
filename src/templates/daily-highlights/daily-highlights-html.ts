import type { Post } from '@/repositories/posts-repository.js'

export function dailyHighlightsHtmlTemplate(userName: string, posts: Post[]): string {
    const items = posts.length
        ? posts
              .map(
                  (post, index) => `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                  <p style="margin: 0; font-weight: bold; color: #333333;">
                    ${index + 1}. ${post.title}
                  </p>
                  <p style="margin: 4px 0 0; color: #777777; font-size: 14px;">
                    por ${post.authorName} · ❤️ ${post.likes} curtidas
                  </p>
                </td>
              </tr>`
              )
              .join('')
        : `<tr><td style="padding: 12px 0; color: #777777;">Nenhum post recebeu curtidas nas últimas 24 horas.</td></tr>`

    return `
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <title>Resumo dos Destaques</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 24px;">
    <table role="presentation" width="100%" style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
      <tr>
        <td style="background-color: #16a34a; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Resumo dos Destaques de Hoje</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px; color: #333333;">
          <p>Olá, ${userName}!</p>
          <p>Aqui está o resumo dos posts que mais bombaram nas últimas 24 horas:</p>
          <table role="presentation" width="100%">
            ${items}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px; text-align: center; color: #999999; font-size: 12px;">
          Este é um e-mail automático gerado pelo job diário de destaques.
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
}
