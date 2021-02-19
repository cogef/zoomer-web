export type Occurrence = {
  occurrenceID: string;
  meetingID: string;
  startDate: number;
  endDate: number;
  host: {
    email: string;
    name: string;
    ministry: string;
  };
  isSeudo: boolean;
  sequence: number;
  totalOccurrences: number;
  title: string;
};
