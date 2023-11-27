import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { Layout } from 'app/layout/layout.types';
import {AppConfig} from "../core/config/app.config";
import {ConfigService} from "../../config/app";

@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy
{
    config!: AppConfig;
    layout: Layout = 'empty';

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _configService: ConfigService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._configService.config$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((config: AppConfig) => {

              // Store the config
              this.config = config;

              // Update the layout
              this._updateLayout();
          });

        // Subscribe to NavigationEnd event
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {
            // Update the layout
            this._updateLayout();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the selected layout
     */
    private _updateLayout(): void
    {
        // Get the current activated route
        let route = this._activatedRoute;
        while ( route.firstChild )
        {
            route = route.firstChild;
        }

        // 1. Set the layout from the config
        this.layout = this.config.layout;

        // 2. Get the query parameter from the current route and
        // set the layout and save the layout to the config
        const layoutFromQueryParam = (route.snapshot.queryParamMap.get('layout') as Layout);
        if ( layoutFromQueryParam )
        {
            this.layout = layoutFromQueryParam;
            if ( this.config )
            {
                this.config.layout = layoutFromQueryParam;
            }
        }

        const paths = route.pathFromRoot;
        paths.forEach((path) => {

            // Check if there is a 'layout' data
            if ( path.routeConfig && path.routeConfig.data && path.routeConfig.data['layout'] )
            {
                // Set the layout
                this.layout = path.routeConfig.data['layout'];
            }
        });
    }
}
