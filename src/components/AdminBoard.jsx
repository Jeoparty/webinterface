import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Connecting from 'components/Connecting';
import InternetExplorerPlaceholder from 'components/InternetExplorerPlaceholder';
import AdminActions from 'components/AdminActions';
import SelectRound from 'components/SelectRound';
import Scoreboard from 'components/Scoreboard';
import Answer from 'components/Answer';
import PlayerList from 'components/PlayerList';
import BuzzerList from 'components/BuzzerList';
import ErrorMessage from 'components/ErrorMessage';
import AdminLog from 'components/AdminLog';

export const AdminBoardStandalone = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        rounds: React.PropTypes.object,
        scoreboard: React.PropTypes.object,
        players: React.PropTypes.object,
        answer: React.PropTypes.object
    },

    render: function() {
        const {serverState, state, rounds, scoreboard, players, newPlayer, currentPlayer, answer, buzzorder, logList} = this.props;
        const {
            eventRefresh,
            eventUpdateScore,
            eventReconnectBuzzer, eventDisconnectBuzzer,
            eventSelectRound,
            eventConnectKeyboard, eventConnectSerial,
            eventAddPlayer, eventUpdatePlayerName, eventConfirmPlayer,
            eventStartGame,
            eventSelectAnswer,
            eventAnswerWin, eventAnswerFail, eventAnswerOops, eventAnswerExit
        } = this.props;

        if(serverState != 'connected') {
            return (
                <div id="app">
                    <header>Jeopardy!</header>
                    <Connecting />
                </div>
            );
        }

        switch(state) {
            case 'new':
                return (
                    <div id="app">
                        <header>Jeopardy!</header>
                        <SelectRound
                            rounds={rounds}
                            onSelect={eventSelectRound} />
                    </div>
                );

            case 'setup':
            case 'scoreboard':
                // table
                return (
                    <div id="app">
                        <header>
                            Jeopardy!
                            <h1>{scoreboard.get('name')}</h1>
                        </header>

                        <div className="pure-g">
                            <div className="pure-u-2-3">
                                <Scoreboard
                                    points={scoreboard.get('points')}
                                    categories={scoreboard.get('categories')}
                                    players={players}
                                    onSelect={eventSelectAnswer} />
                            </div>
                            <div className="pure-u-1-3">
                                <p>State: {state} </p>
                                <AdminActions
                                    state={state}
                                    playerCount={players.size}
                                    buzzerCount={buzzorder ? buzzorder.size : 0}
                                    newPlayer={newPlayer}
                                    onRefresh={eventRefresh}
                                    onConnectKeyboard={eventConnectKeyboard}
                                    onConnectSerial={eventConnectSerial}
                                    onAddPlayer={eventAddPlayer}
                                    onUpdatePlayerName={eventUpdatePlayerName}
                                    onConfirmPlayer={eventConfirmPlayer}
                                    onStartGame={eventStartGame}
                                    onAnswerWin={eventAnswerWin}
                                    onAnswerFail={eventAnswerFail}
                                    onAnswerOops={eventAnswerOops}
                                    onAnswerExit={eventAnswerExit} />

                                <AdminLog
                                    logList={logList} />
                            </div>
                        </div>
                        <PlayerList
                            players={players}
                            newPlayer={newPlayer}
                            currentPlayer={currentPlayer}
                            onUpdateScore={eventUpdateScore}
                            onReconnectBuzzer={eventReconnectBuzzer}
                            onDisconnectBuzzer={eventDisconnectBuzzer} />
                    </div>
                );

            case 'answer':
                // answer
                return (
                    <div id="app">
                        <header>
                            Jeopardy!
                        </header>

                        <div className="pure-g">
                            <div className="pure-u-2-3">
                                <Answer
                                    answer={answer} />
                            </div>
                            <div className="pure-u-1-3">
                                <p>State: {state}</p>

                                <AdminActions
                                    state={state}
                                    playerCount={players.size}
                                    buzzerCount={buzzorder ? buzzorder.size : 0}
                                    newPlayer={newPlayer}
                                    onRefresh={eventRefresh}
                                    onConnectKeyboard={eventConnectKeyboard}
                                    onConnectSerial={eventConnectSerial}
                                    onAddPlayer={eventAddPlayer}
                                    onUpdatePlayerName={eventUpdatePlayerName}
                                    onConfirmPlayer={eventConfirmPlayer}
                                    onStartGame={eventStartGame}
                                    onAnswerWin={eventAnswerWin}
                                    onAnswerFail={eventAnswerFail}
                                    onAnswerOops={eventAnswerOops}
                                    onAnswerExit={eventAnswerExit} />

                                <AdminLog
                                    logList={logList} />
                            </div>
                        </div>
                        <BuzzerList
                            buzzorder={buzzorder}
                            players={players} />
                        <PlayerList
                            players={players}
                            currentPlayer={currentPlayer}
                            onUpdateScore={eventUpdateScore}
                            onReconnectBuzzer={eventReconnectBuzzer}
                            onDisconnectBuzzer={eventDisconnectBuzzer} />
                    </div>
                );
                break;

            case 'double_jeopardy':
                // double_jeopardy
                break;

            case 'results':
                // results
                break;

            default:
                console.error('unknown state: ' + state);
                break;
        }

        return (
            <div id="app">
                <ErrorMessage/>
            </div>
        );
    }
});


export const AdminBoard = connect((state) => {
    return {
        serverState: state.getIn(['server', 'state']),
        state: state.getIn(['game', 'state']),
        rounds: state.getIn(['game', 'rounds']),
        scoreboard: state.getIn(['game', 'scoreboard']),
        players: state.getIn(['game', 'players']),
        newPlayer: state.getIn(['game', 'new_player']),
        currentPlayer: state.getIn(['game', 'current_player']),
        answer: state.getIn(['game', 'answer']),
        buzzorder: state.getIn(['game', 'buzzorder']),
        logList: state.get('log')
    };
}, actionCreators)(AdminBoardStandalone);