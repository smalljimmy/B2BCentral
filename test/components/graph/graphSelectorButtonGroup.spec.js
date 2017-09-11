import {expect} from 'chai';
import sinon from 'sinon';
import * as React from 'react';
import {shallow, mount, render} from 'enzyme';
import GraphSelectorButtonGroup from '../../../script/components/graph/graphSelectorButtonGroup';
import Button from 'amazonui-react-elements/elements/button';

const fakeGraphTitle = "Foo";

function getGraphNames(size) {
    const buttonTitles = [];

    // generate fake buttons for the given count
    for (let i = 0; i < size; ++i) {
        buttonTitles.push(fakeGraphTitle + i);
    }

    return buttonTitles;
}

describe('GraphSelectorButtonGroup', function () {
    let tests = [
        {buttonTitles: 0, buttonsDisplayed: 0},
        {buttonTitles: 1, buttonsDisplayed: 0},
        {buttonTitles: 2, buttonsDisplayed: 2},
        {buttonTitles: 3, buttonsDisplayed: 3},
    ];

    tests.forEach(function (test) {
        describe(`${test.buttonTitles} Buttons`, function () {
            before(function () {
                const buttonTitles = getGraphNames(test.buttonTitles);

                this.graphSelectorButton = mount(<GraphSelectorButtonGroup graphNames={buttonTitles} />);
                expect(this.graphSelectorButton).to.be.ok;
            });

            it(`should have ${test.buttonsDisplayed} buttons`, function () {
                expect(this.graphSelectorButton.find(Button)).to.have.length(test.buttonsDisplayed);
            });

            it(`should respond to size changes`, function () {
                const size = test.buttonTitles + 3;
                const buttonTitles = getGraphNames(size);
                this.graphSelectorButton.setProps({graphNames: buttonTitles});

                expect(this.graphSelectorButton.find(Button)).to.have.length(test.buttonTitles + 3);
            });
        });
    });

    describe('General', function () {
        it('should fire onclick once with the graph name that was clicked', function () {
            const spy = sinon.spy();
            const graphSelectorButton = mount(
                <GraphSelectorButtonGroup
                    graphNames={['0', '1', '2', '3']}
                    onClick={spy}
                />);

            const allButtons = graphSelectorButton.find(Button);
            allButtons.at(1).simulate('click');

            expect(spy.calledOnce).to.be.true;
            expect(spy.calledWith('1')).to.be.true;
        });

        it('should mark the matching button as selected', function () {
            const graphSelectorButton = mount(
                <GraphSelectorButtonGroup
                    graphNames={['0', '1', '2', '3']}
                    onClick={sinon.spy()}
                    selectedGraphName={'2'}
                />);

            const selected = graphSelectorButton.find('.button-selected');

            expect(selected.text()).to.be.equal('2');
        });

        it('should update selected when props change', function () {
            const graphSelectorButton = mount(
                <GraphSelectorButtonGroup
                    graphNames={['0', '1', '2', '3']}
                    onClick={sinon.spy()}
                    selectedGraphName={'2'}
                />);

            let selected = graphSelectorButton.find('.button-selected');
            expect(selected.text()).to.be.equal('2');

            graphSelectorButton.setProps({selectedGraphName: '0'});
            selected = graphSelectorButton.find('.button-selected');
            expect(selected.text()).to.be.equal('0');
        });
    });
});
