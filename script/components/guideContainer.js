import React from 'react';
import {Section, PageContext, Expander, ExpanderHeading, ExpanderContent} from 'amazonui-react-elements/elements';
import StringUtil from "../util/stringUtil";

/**
 * Class representing the panel section of the page for the welcome banner.
 */
export default class GuideContainer extends React.Component {

    componentDidMount() {
    }

    /**
     * Renders the TitlePanel component.
     * @returns {XML}
     */
    render() {
        return (
               <PageContext renderFn={() =>
                   <Section name="test-accordion">
                        <Expander expanderType="section">
                            <ExpanderHeading expanderType="section">
                            	{StringUtil.getString('b2bcentral_desktop_guide_profile_header')}
                            </ExpanderHeading>
                            <ExpanderContent expanderType="section">
                            	<p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_what')} </strong></p>                           
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_profile_content_1')}</p>
	                            
	                            <p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_why')} </strong></p>      
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_profile_content_2')} </p>
	                            
	                            <p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_how')} </strong></p>      
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_profile_content_3')} </p>
                            </ExpanderContent>
                        </Expander>
                        
                        <Expander expanderType="section">
                            <ExpanderHeading expanderType="section">
                            	{StringUtil.getString('b2bcentral_desktop_guide_cred_header')}
                            </ExpanderHeading>
                            <ExpanderContent expanderType="section">
                            	<p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_what')} </strong></p>
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_cred_content_1')} </p>
	                            
	                            <p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_why')} </strong></p>  	                            
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_cred_content_2')} </p>
	                            
	                            <p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_how')} </strong></p>      	                            
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_cred_content_3')} </p>
                            </ExpanderContent>
                        </Expander>
                        
                        <Expander expanderType="section">
                            <ExpanderHeading expanderType="section">
                            	{StringUtil.getString('b2bcentral_desktop_guide_badge_header')}
                            </ExpanderHeading>
                            <ExpanderContent expanderType="section">
                        		<p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_what')} </strong></p>                            
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_badge_content_1')} </p>
	                            
	                            <p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_why')} </strong></p>  		                            
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_badge_content_2')} </p>
	                            
	                            <p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_how')} </strong></p> 	                            
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_badge_content_3')} </p>
                            </ExpanderContent>
                        </Expander>
                    
                        <Expander expanderType="section">
                            <ExpanderHeading expanderType="section">
                            	{StringUtil.getString('b2bcentral_desktop_guide_pricing_header')}
                            </ExpanderHeading>
                            <ExpanderContent expanderType="section">
                    			<p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_what')} </strong></p>                             
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_pricing_content_1')} </p>
	                            
	                            <p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_why')} </strong></p>  	                            
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_pricing_content_2')} </p>
	                            
	                            <p><strong> {StringUtil.getString('b2bcentral_desktop_guide_content_how')} </strong></p> 	                            
	                            <p> {StringUtil.getString('b2bcentral_desktop_guide_pricing_content_3')} </p>
                            </ExpanderContent>
                        </Expander>
                    </Section>
               } />
        );
    }
}