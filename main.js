import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Vibration,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import syllables from './syllables';

const deviceWidth = Dimensions.get('window').width;

const App = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      count: 0,
      boomFinished: true,
      syllable: '',
    };
  },

  componentDidMount() {
    this.setInterval(() => {
      const newCount = this.state.count - 1;

      if (newCount >= 0) {
        this.setState({count: newCount});
      }

      if (newCount === 0) {
        //Vibration.vibrate();

        this.setTimeout(() => {
          this.setState({boomFinished: true});
        }, 2000)
      }
    }, 1000);
  },

  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}

        <View style={styles.cardWrapper}>
          <Text style={styles.card}>{this.state.syllable}</Text>
        </View>

        <TouchableOpacity
          onPress={this.startNextRound}
          style={styles.button}
        >
          <Text style={styles.nextRoundButton}>Start the game</Text>
        </TouchableOpacity>
      </View>
    );
  },

  renderImage() {
    if (this.state.count === 0) {
      if (this.state.boomFinished) {
        return <View />;
      } else {
        return <Image source={require('./bomb_boom.gif')} />
      }
    } else {
      return <Image source={require('./bomb.gif')} />
    }
  },

  startNextRound() {
    const count = Math.round(Math.random() * 40 + 20);

    const randIndex = Math.round(Math.random() * syllables.length);
    const syllable = syllables[randIndex];

    this.setState({count, boomFinished: false, syllable});
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04FF00',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  button: {
    backgroundColor: 'black',
    height: 60,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  nextRoundButton: {
    fontSize: 21,
    color: 'white',
  },
  cardWrapper: {
    backgroundColor: 'black',
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  card: {
    color: 'white',
    fontSize: 42,
  }
});

Exponent.registerRootComponent(App);
