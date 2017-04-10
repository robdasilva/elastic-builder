'use strict';

const _ = require('lodash');

const {
    Query,
    util: { checkType }
} = require('../../core');

/**
 * A query that generates the union of documents produced by its subqueries,
 * and that scores each document with the maximum score for that document
 * as produced by any subquery, plus a tie breaking increment for
 * any additional matching subqueries.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-dis-max-query.html)
 *
 * @extends Query
 */
class DisMaxQuery extends Query {

    /**
     * Creates an instance of `DisMaxQuery`
     */
    constructor() {
        super('dis_max');
    }

    /**
     * Add given query to list of queries under given clause.
     *
     * @private
     * @param {Query} query
     * @throws {TypeError} If query is not an instance of `Query`
     */
    _addQuery(query) {
        checkType(query, Query);

        this._queryOpts.queries.push(query);
    }

    /**
     * The tie breaker value. The tie breaker capability allows results
     * that include the same term in multiple fields to be judged better than
     * results that include this term in only the best of those multiple
     * fields, without confusing this with the better case of two different
     * terms in the multiple fields. Default: `0.0`.
     *
     * @param {number} factor
     * @returns {DisMaxQuery} returns `this` so that calls can be chained.
     */
    tieBreaker(factor) {
        this._queryOpts.tie_breaker = factor;
        return this;
    }

    /**
     * Add given query array or query to list of queries
     *
     * @param {Array<Query>|Query} queries Array of valid `Query` objects or a `Query` object
     * @returns {DisMaxQuery} returns `this` so that calls can be chained.
     */
    queries(queries) {
        if (!_.has(this._queryOpts, 'queries')) this._queryOpts.queries = [];

        if (_.isArray(queries)) _.invokeMap(queries, qry => this._addQuery(qry));
        else this._addQuery(queries);

        return this;
    }
}

module.exports = DisMaxQuery;