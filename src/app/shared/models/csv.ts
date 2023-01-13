export interface Csv {
	checknumberID: string;
	transaction: string;
	amount: string;
	date: string;
    checknumberID2: string,
    transaction2: string,
    amount2: string,
    date2: string,
}

export interface Statement {
	checknumber: string;
     transaction: string;
     amount: string;
     date: string;
	checked: boolean;
	similarityScore?: number;
}

