export interface CountOfUnreadMessages {
  totalCount: number;
  countBySender: Record<string, number>;
}
