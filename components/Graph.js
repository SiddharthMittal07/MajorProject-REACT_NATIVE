import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Text, Rect, G, Line } from 'react-native-svg';
import { max, scaleLinear, scaleBand, mean } from 'd3';

function modifyTitle(algorithm) {
    const letters = algorithm.split('');
    if (letters.length < 5) {
        return algorithm;
    } else {
        let newTitle = letters[0];
        for (let i = 1; i < letters.length; i++) {
            if (letters[i].toUpperCase() === letters[i]) {
                return newTitle;
            } else {
                newTitle += letters[i];
            }
        }
        return newTitle;
    }
}

export default function Graph({ yAttribute, data }) {

    if (!data) {
        return <Text>Loading...</Text>
    }

    const width = Dimensions.get('window').width * 0.95;
    const height = Dimensions.get('window').height * 0.4;
    const margin = { top: 10, bottom: 20, left: 30, right: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xValue = d => d.algorithm;
    const yValue = d => d[yAttribute];

    const xScale = scaleBand().domain(data.map(d => xValue(d))).range([0, innerWidth]).padding(0.5);
    const yScale = scaleLinear().domain([0, max(data, yValue)]).range([innerHeight, 0]);

    const maxValue = max(data, yValue);
    const averageValue = mean(data, yValue);

    if (maxValue <= 1) {
        data.map(d => {
            if (yValue(d) < averageValue) {
                d.color = 'rgba(255,0,0,0.6)';
            } else {
                d.color = 'rgba(0,0,255,0.6)';
            }
        });
    } else {
        data.map(d => {
            if (yValue(d) < averageValue) {
                d.color = 'rgba(0,0,255,0.6)';
            } else {
                d.color = 'rgba(255,0,0,0.6)';
            }
        })
    }


    return (
        <Svg width={width} height={height} style={styles.graph}>
            <G transform={`translate(${margin.left}, ${margin.top})`}>
                <G transform={`translate(0, ${innerHeight})`}>
                    <Line stroke="#000" x2={innerWidth} />
                    {
                        xScale.domain().map(tickValue =>
                            <G transform={`translate(${xScale(tickValue)}, 3)`} key={tickValue}>
                                <Line y1={-6} stroke="rgba(0,0,0,0.3)" />
                                <Text fill="rgba(0,0,0,0.5)" dy="0.81em" textAnchor="middle">{modifyTitle(tickValue)}</Text>
                            </G>
                        )
                    }
                </G>
                <G>
                    <Line stroke="#000" y2={innerHeight} />
                    {
                        yScale.ticks().map(tickValue =>
                            <G transform={`translate(-3, ${yScale(tickValue)})`} key={tickValue}>
                                <Line x2={6} stroke="rgba(0,0,0,0.3)" />
                                <Text fill="rgba(0,0,0,0.5)" textAnchor="end">{tickValue}</Text>
                            </G>
                        )
                    }
                </G>

                {
                    data.map(d =>
                        <G transform={`translate(${xScale(xValue(d))}, ${yScale(yValue(d))})`} key={d.algorithm}>
                            <Rect height={innerHeight - yScale(yValue(d))} width={xScale.bandwidth()} x={-xScale.bandwidth() / 2} fill={d.color} />
                        </G>
                    )
                }
            </G>
        </Svg>
    );
}

const styles = StyleSheet.create({
    graph: {
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 10,
    }
})