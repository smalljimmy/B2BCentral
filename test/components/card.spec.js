import {expect} from "chai";
import React from "react";
import {shallow, mount, render} from 'enzyme';
import Card from '../../script/components/card';
import CardBody from '../../script/components/cardBody';
import CardHeader from '../../script/components/cardHeader';

describe('Card', function () {
    describe('Card with components visible', function () {
        before(function () {
            let mockStore = {
                get: function() {
                    {};
                }
            };
            let mockBaseCardProps = {
                title: '',
                updatedDateLabel: {
                    lastUpdated: 'Last Updated',
                    updating: 'Updating...',
                }
            };

            this.card = shallow(<Card store = {mockStore} baseCardProps={mockBaseCardProps}/>);
            expect(this.card).to.have.length(1);
        });

        it('The CardHeader component should be visible',function () {
            expect(this.card.find(CardHeader)).to.have.length(1);
        });
        it('The CardBody component should be visible', function () {
            this.cardBody = this.card.find(CardBody);

            expect(this.cardBody).to.have.length(1);
        });
    });

});