import React from 'react';
import StringUtil from "../util/stringUtil";
import {Heading, GridColumn, Button, DeclarativeAction, PopoverTrigger, PopoverPreloadContent} from 'amazonui-react-elements/elements';
import HMDPanel from './HMDPanel';

/**
 * Class representing the panel section of the page for the welcome banner.
 */
export default class WelcomeBanner extends React.Component {
    /**
     * Constructs an instance of TitlePanel with props.
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            bannerShown: this._loadBannerStatus(),
        };

        this._toggleBanner = this._toggleBanner.bind(this);
    }

    componentDidMount() {
    }

    _toggleBanner() {
        const newState = !this.state.bannerShown;
        this.setState({bannerShown: newState});
        //persist the status in browser's local storage
        localStorage.bannerShown = JSON.stringify(newState);
    }

    _loadBannerStatus() {
        if (!localStorage.bannerShown) {
            localStorage.bannerShown = JSON.stringify(true);
        }
        return JSON.parse(localStorage.bannerShown);
    }

    /**
     * Renders the TitlePanel component.
     * @returns {XML}
     */
    render() {
        const heading = this.props.heading;
        
        const popoverParams = {
                name: 'video',
                width: '1000',
                height: '500',
                activate: 'onclick',
                closeButton: false,
                position: 'triggerBottom',
                padding: 'none',
            };
    	
        const banner = this.state.bannerShown ?
                <div className="banner-new a-spacing-top-base a-padding-mini">
                    <div className="banner-header-group">
	        			<button className="a-button-close button-close-banner" aria-label="Close" onClick={this._toggleBanner}>
	    					<i className="a-icon a-icon-close"/>
	    				</button>
                        <h2 className="a-text-bold a-spacing-top-small color-h2 a-text-center inline-block">{StringUtil.getString('b2bcentral_desktop_welcome_header')}</h2>
                    </div>
                    <p className="a-size-medium a-text-center a-spacing-top-small a-spacing-small a-color-base text-width">
                       {StringUtil.getString('b2bcentral_desktop_welcome_content_1')}
                       {StringUtil.getString('b2bcentral_desktop_welcome_content_2')}
                    </p>
                    <div className="buttonDiv a-spacing-small">
                    	<DeclarativeAction actionName="a-popover" actionParams={popoverParams}>
				                <Button id="buttonAttr">
				                	{StringUtil.getString('b2bcentral_desktop_welcome_link')}
					                &nbsp;
					                <i className="icon video_library"></i>
				                </Button>
		                </DeclarativeAction>
		                
			            <PopoverPreloadContent popoverName={popoverParams.name}>
			            	<iframe frameBorder="0" src={StringUtil.getString('b2bcentral_desktop_welcome_video_link')} target="_parent" allowFullScreen="true" className='iframe-video'/> 		            	
			            </PopoverPreloadContent>   		                
		                
                    </div>
                </div> : null;

        return (
        		<div className="inline">       		
        			<div className="banner-link a-padding-small inline-block">
	                    <ul className="a-unordered-list a-nostyle a-horizontal">
	                        <li>
	                            <span className="a-list-item">
	                                <a className="a-link-normal" href="/gp/help/202161480" target="_blank">{StringUtil.getString('b2bcentral_desktop_sales_tooltip_link')}</a>
	                            </span>
	                        </li>
	                        <li>
	                            <span className="a-list-item">
	                                <i className="a-icon a-icon-text-separator"></i>
	                            </span>
	                        </li>
	
	                        <li>
	                            <span className="a-list-item">
	                                <HMDPanel />
	                            </span>
	                        </li>
	                    </ul>
	                </div>
                
                {banner}
            </div>
        );
    }
}