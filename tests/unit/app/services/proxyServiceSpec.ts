/// <reference path='../../../../typings/tsd.d.ts' />

export function main() {
    describe("A suite", function () {
        beforeEach(function () {

        });

        it("contains spec with an expectation", function () {

            expect(true).toBe(true);
        });
        it("contains spec with an expectation", function () {

            expect(true).toBe(true);

        });
    });
}