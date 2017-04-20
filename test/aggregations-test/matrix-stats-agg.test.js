import test from 'ava';
import { MatrixStatsAggregation } from '../../src';
import { setsAggType, illegalParamType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = fields => new MatrixStatsAggregation('my_agg', fields);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'matrix_stats');

test(setsAggType, MatrixStatsAggregation, 'matrix_stats');
test(illegalParamType, getInstance(), 'fields', 'Array');
test(aggPropIsSet, 'fields', { param: ['fieldA', 'fieldB'], spread: false });
test(aggPropIsSet, 'mode', { param: 'avg' });
test(aggPropIsSet, 'missing', { param: { income: 50000 } });

test('constructor sets arguments', t => {
    const valueA = getInstance(['fieldA', 'fieldB']).toJSON();
    const valueB = getInstance().fields(['fieldA', 'fieldB']).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_agg: {
            matrix_stats: {
                fields: ['fieldA', 'fieldB']
            }
        }
    };
    t.deepEqual(valueA, expected);
});
