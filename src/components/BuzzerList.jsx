import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        buzzorder: React.PropTypes.object,
        players: React.PropTypes.object
    },

    render: function() {
        const {buzzorder, players} = this.props;

        const getPlayer = player => {
            return players.get(player.get('id'));
        };

        const getPlayerName = player => {
            return !players ? '' : getPlayer(player).get('name');
        };
        const getPlayerStyle = player => {
            return { backgroundColor: getPlayer(player).get('color') };
        };

        // TODO color
        const renderBuzzer = (player) => (
            <td style={getPlayerStyle(player)}>
                <span className="player-name">
                    {getPlayerName(player)}
                </span>

                <span className="buzzer-time">
                    + {player.get('time')} ms
                </span>
            </td>
        );

        return (
            <table className="buzzer-list">
                <tbody>
                    <tr>
                        {buzzorder.map(renderBuzzer)}
                    </tr>
                </tbody>
            </table>
        );
    }
});