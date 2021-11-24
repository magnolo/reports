import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from '@twentythree/core/navigation/navigation.service';
import { UserService } from '@twentythree/core/user/user.service';
import { MessagesService } from '@twentythree/layout/common/messages/messages.service';
import { NotificationsService } from '@twentythree/layout/common/notifications/notifications.service';
import { ShortcutsService } from '@twentythree/layout/common/shortcuts/shortcuts.service';
import { forkJoin, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _messagesService: MessagesService,
        private _navigationService: NavigationService,
        private _notificationsService: NotificationsService,
        private _shortcutsService: ShortcutsService,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._navigationService.get(),
            this._messagesService.getAll(),
            this._notificationsService.getAll(),
     
            this._shortcutsService.getAll(),
            this._userService.get()
        ]);
    }
}
