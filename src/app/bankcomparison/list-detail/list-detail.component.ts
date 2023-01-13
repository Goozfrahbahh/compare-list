import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Csv } from '../../shared/models/csv';
import { DataStoreService } from '../../shared/services/data.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit{

	item: Observable<any>;
	constructor(private route: ActivatedRoute,
					 private router: Router,
					 private dataStore: DataStoreService) { }
	ngOnInit (): void {
				this.item = this.route.paramMap.pipe(
                    switchMap((params: ParamMap) =>
                        this.dataStore.getStatementID1(params.get('checknumber'))
                    )
                );
	}

	goToItem(item: Csv) {
		const itemId = item ? item.checknumberID : null;

		this.router.navigate(['/compare/', { checknumberID: itemId, meta: 'edited' }]);
	}
		
			
}

