export interface Csv {
	checknumber: string;
	transaction: string;
	amount: string;
	date: string;
    checknumber2: string,
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

