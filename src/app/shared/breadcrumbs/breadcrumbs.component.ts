import { Component } from '@angular/core';
import { Router, ActivationEnd, Data } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent {

  titleHTML: string;

  constructor(
    private router: Router,
    private title : Title,
    private meta  : Meta
  ) {
    this.getDataRouter().subscribe(data => {
      this.titleHTML = data.title;
      this.title.setTitle(this.titleHTML);

      const metaTag: MetaDefinition = {
        name   : 'description',
        content: this.titleHTML,
      };

      this.meta.updateTag(metaTag);
    });
  }

  private getDataRouter(): Observable<Data> {
    return this.router.events.pipe(
      filter((evt: any)           => evt instanceof ActivationEnd),
      filter((evt: ActivationEnd) => evt.snapshot.firstChild === null),
      map((evt: ActivationEnd)    => evt.snapshot.data)
    );
  }

}
