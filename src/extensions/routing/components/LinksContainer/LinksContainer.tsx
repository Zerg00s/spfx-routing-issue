import * as React from 'react';


export default class LinksContainer extends React.Component {
    constructor(props) {
        super(props);
    
    }
    public render() {
        return (
            <>
            <h1>Click on one of these links:</h1>
                <div>
                    <a href='/SitePages/a.aspx' data-interception={'propagate'} onClick={this.onLinkClick.bind(this)}>
                        data-interception='propagate' - /SitePages/a.aspx
                    </a>
                </div>
                <div>
                    <a href='/_layouts/15/search.aspx?q=test' data-interception={'propagate'} onClick={this.onLinkClick.bind(this)}>
                        data-interception='propagate' - https://zergs.sharepoint.com/_layouts/15/search.aspx?q=test
                    </a>
                </div>
                <div>
                    <a href='/_layouts/15/search.aspx/siteall?q=test'onClick={this.onLinkClick.bind(this)}>
                        no interception - /_layouts/15/search.aspx/siteall?q=test
                    </a>
                </div>
            </>
        );
    }
    private onLinkClick(): void {
        console.log('onLinkClicked fired!');
    }
}
