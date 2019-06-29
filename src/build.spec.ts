import { buildDataMatrix } from "./build";
import { $0, $00, $$ } from "./meta-value";

describe('buildDataMatrix', () => {
    it('should match result', () => {
        // Given
        type Test = { val: string, obj: { val1: number, val2: boolean } };
        const header = [
            ['val', 'obj'          ],
            [[],    ['val1','val2']]
        ];
        const data = [
            [
                ['grp1',1,      false],
                [               true],
                [       2,      $$],
                [       $0,     $00],
            ], [
                ['grp2',1,      true],
                [               false],
                [$00,   2,      $$],
                [$$,    $0,     $0],
                [$0,    $0,     $00],
            ]
        ];
        const expected: Test[] = [
            { val: 'grp1', obj: { val1: 1, val2: false } },
            { val: 'grp1', obj: { val1: 1, val2: true } },
            { val: 'grp1', obj: { val1: 2, val2: true } },
            { val: 'grp1', obj: { val1: 1, val2: false } },

            { val: 'grp2', obj: { val1: 1, val2: true } },
            { val: 'grp2', obj: { val1: 1, val2: false } },
            { val: 'grp1', obj: { val1: 2, val2: false } },
            { val: 'grp1', obj: { val1: 1, val2: true } },
            { val: 'grp2', obj: { val1: 1, val2: false } },
        ];

        // When
        const tests = buildDataMatrix<Test>(header, ...data);

        // Then
        expect(tests).toEqual(expected);
    });
});