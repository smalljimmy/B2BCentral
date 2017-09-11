import {assert, expect} from 'chai';
import {checkObjectHasProperty, namespaceCardId} from '../../script/util/util';

describe('util', function () {
    describe('namespaceCardId', function () {
        const cardLength = 5;

        it('should prepend "card-"', function () {
            expect(namespaceCardId("foo").substr(0, cardLength)).to.be.equal("card-");
        });

        it('should lowercase first letter', function () {
            expect(namespaceCardId("Bob").charAt(cardLength)).to.be.equal("b");
        });

        it('should remove preceding spaces', function () {
            expect(namespaceCardId('   foo').indexOf(' ')).to.be.equal(-1);
        });

        it('should remove internal spaces', function () {
            expect(namespaceCardId('foo bar').indexOf(' ')).to.be.equal(-1);
        });

        it('should remove trailing spaces', function () {
            expect(namespaceCardId('foo    ').indexOf(' ')).to.be.equal(-1);
        });

        it('should remove apostrophes', function () {
            expect(namespaceCardId('foo\'bar').indexOf('\'')).to.be.equal(-1);
        });

        it('should remove dots', function () {
            expect(namespaceCardId('foo.bar').indexOf('.')).to.be.equal(-1);
        });

        it('should remove commas', function () {
            expect(namespaceCardId('foo,bar').indexOf(',')).to.be.equal(-1);
        });

        it('should remove forward slashes', function () {
            expect(namespaceCardId('foo/bar').indexOf('/')).to.be.equal(-1);
        });

        it('should remove back slashes', function () {
            expect(namespaceCardId('\\').indexOf('\\')).to.be.equal(-1);
        });
    });

    describe('checkObjectHasProperty', function () {
        before(function () {
           this.obj = {a:'a',};
        });

        it('returns true for contained property', function () {
            expect(checkObjectHasProperty(this.obj, 'a')).to.be.equal(true);
        });

        it('returns false for not contained property', function () {
            expect(checkObjectHasProperty(this.obj, 'b')).to.be.equal(false);
        });

        it('returns false for null', function () {
            expect(checkObjectHasProperty(this.obj, null)).to.be.equal(false);
        });

        it('returns false for undefined', function () {
            expect(checkObjectHasProperty(this.obj, undefined)).to.be.equal(false);
        });
    });
});
