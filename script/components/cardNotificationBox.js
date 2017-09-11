import * as React from 'react';
import {Box, Section} from "amazonui-react-elements/elements";
 
 export default class CardNotificationBox extends React.Component {
     render() {
         return (
              <Section cssClass="card-notification-box">
                 <Box>{this.props.children}</Box>
             </Section>
         );
     }
 } 