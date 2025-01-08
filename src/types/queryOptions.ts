import type { DifficultyEnum, TypeEnum } from "./triviaApi";

export type QueryProps = {
  amount: string | number | null;
  category: string;
  difficulty: DifficultyEnum | string;
  type: TypeEnum | string;
}