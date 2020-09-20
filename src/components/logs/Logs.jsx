import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logAction';

function Logs({ log: { logs, loading }, getLogs }) {

    useEffect(() => {
        getLogs();
        // eslint-disable-next-line
    }, [])

    if(loading || logs === null) {
        return <Preloader />;
    }

    return (
        <div>
            <ul className="collection-with-header">
                <li className="collection-header">
                    <h4 className="center">System Logs</h4>
                </li>
                {!loading && logs.length === 0 ? (
                    <p className="center">No logs to show...</p>
                ) : (
                    logs.map(log => <LogItem log={log} ley={log.id} />)
                )}
            </ul>
        </div>
    )
}

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired
}

// map what I want from initialState on logReducer
const mapStateToProps = state => ({
    // prop: state
    log: state.log
}) ;

// actions getLogs are passed as props too, to the component above
export default connect(mapStateToProps, { getLogs })(Logs);
