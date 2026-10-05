import { compare } from "bcryptjs";
import type { HashProvider } from "./hash-provider.js";

export class BcryptHashProvider implements HashProvider {
	async compare(plain: string, hashed: string) {
		return compare(plain, hashed);
	}
}
