export interface UserSmokeHistoryResponse {
  id: string;
  userId: string;
  quitDate: string;
  packsPerDay: number;
  cigarettesPerPack: number;
  costPerPack: number;
  cigarettesPerDay: number;
  reasonForQuitting: string;
}

export interface UserSmokeHistoryRequest {
  quitDate: string;
  costPerPack: number;
  reasonForQuitting: string;
  packsPerDay: number;
  cigarettesPerPack: number;
}
