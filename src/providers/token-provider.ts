import type { UserRole } from "@/@types/prisma/enums.js";

export interface TokenProvider {
	generate(payload: { sub: string; role: UserRole }): Promise<string>;
}
