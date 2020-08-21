export interface Sprint {
    id: number;
    name: string;
    completeDate?: Date;
    endDate?: Date;
    startDate?: Date;
    originBoardId: number;
    self: string;
    state: string;
}
