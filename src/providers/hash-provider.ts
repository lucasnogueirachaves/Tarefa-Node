export interface HashProvider {
	compare(plain: string, hashed: string): Promise<boolean>;
}
