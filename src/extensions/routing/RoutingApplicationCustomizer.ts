import { override } from '@microsoft/decorators';
import * as ReactDom from 'react-dom';
import * as React from 'react';
import { Log } from '@microsoft/sp-core-library';
import LinkContainer from './components/LinksContainer/LinksContainer';
import {
  BaseApplicationCustomizer,
  PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'RoutingApplicationCustomizerStrings';

const LOG_SOURCE: string = 'RoutingApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IRoutingApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class RoutingApplicationCustomizer
  extends BaseApplicationCustomizer<IRoutingApplicationCustomizerProperties> {
  private readonly _domPlaceholderId = 'topHeaderPlaceholder';
  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public async onInit(): Promise<void> {
    await super.onInit();

    if (document.getElementById(this._domPlaceholderId)) {
      console.log(`Already initialized ${strings.Title}. Skipping instantiation`);
      return;
    } else {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
      if (this._topPlaceholder) {
        this._topPlaceholder.domElement.id = this._domPlaceholderId;
      }

      const topElement: React.ReactElement<any> = React.createElement(LinkContainer, null);

      // TODO: add an <a data-intercept="propagate" onClick="OMG">Click Me></a>
      ReactDom.render(topElement, this._topPlaceholder.domElement);
    }

    this.context.application.navigatedEvent.add(this, this.showAlertEventFired);
    this.context.placeholderProvider.changedEvent.add(this, this.showAlertChangedEvent);
  }

  public showAlertEventFired(): void {
    console.log('navigatedEvent fired...' + this.context.pageContext.web.serverRelativeUrl + '[' + Date.now() + ']');
  }
  public showAlertChangedEvent(): void {
    console.log('changedEvent fired...' + this.context.pageContext.web.serverRelativeUrl + '[' + Date.now() + ']');
  }

  protected _onDispose(): void {
    console.log('Disposed Top Navigation placeholder.');
  }

}