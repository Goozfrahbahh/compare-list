import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Statement } from '../models/csv';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const statement1 = [
            {
                checknumberId: '1',
                transactionType: 'Bank',
                amoun: '1000',
                date: '10/11/2001',
            },
        ];
        const statement2 = [
            {
                checknumberId: '1',
                transactionType: 'Bank',
                amount: '1000',
                date: '10/11/2001',
            },
        ];
        return { statement2, statement1 };
    }
    
}