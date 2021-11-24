import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseNavigationModule } from '@twentythree/fuse/components/navigation';
import { FuseLoadingBarModule } from '@twentythree/fuse/components/loading-bar';
// import { // FuseFullscreenModule } from '@twentythree/fuse/components/fullscreen/fullscreen.module';
// import { // LanguagesModule } from '@twentythree/layout/common/languages/languages.module';
import { MessagesModule } from '@twentythree/layout/common/messages/messages.module';
import { NotificationsModule } from '@twentythree/layout/common/notifications/notifications.module';
// import {  QuickChatModule } from '@twentythree/layout/common/quick-chat/quick-chat.module';
import { SearchModule } from '@twentythree/layout/common/search/search.module';
import { ShortcutsModule } from '@twentythree/layout/common/shortcuts/shortcuts.module';
import { UserModule } from '@twentythree/layout/common/user/user.module';
import { SharedModule } from '@twentythree/shared';
import { ClassyLayoutComponent } from '@twentythree/layout/layouts/vertical/classy/classy.component';

@NgModule({
    declarations: [
        ClassyLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        // FuseFullscreenModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        // LanguagesModule,
        MessagesModule,
        NotificationsModule,
        // QuickChatModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule
    ],
    exports     : [
        ClassyLayoutComponent
    ]
})
export class ClassyLayoutModule
{
}
