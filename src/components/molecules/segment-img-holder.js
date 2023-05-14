import React from 'react';

class ImageHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mousePosition: { x: 0, y: 0 },
            clickPositions: [],
        };
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseClick = this.handleMouseClick.bind(this);

    }

    handleMouseMove(e) {
        this.setState({ mousePosition: { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY } });
    }
    handleMouseClick(e) {
        const { offsetX, offsetY } = e.nativeEvent;
        this.props.onUpdateClickedPositions([...this.state.clickPositions, { x: offsetX, y: offsetY }])
        this.setState(prevState => ({
            clickPositions: [...prevState.clickPositions, { x: offsetX, y: offsetY }],
        }));
    }

    render() {
        const { src } = this.props;

        return (
            <div style={{ position: 'relative' }}>
                <img src={src} width="300" height="533"  alt="" onMouseMove={this.handleMouseMove} onClick={this.handleMouseClick}/>
                {this.state.clickPositions.map((pos, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: pos.y,
                            left: pos.x,
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: 'purple',
                        }}
                    />
                ))}
                <p>Mouse position: {this.state.mousePosition.x}, {this.state.mousePosition.y}</p>
                <ul>
                    {this.state.clickPositions.map((pos, i) => (
                        <li key={i}>Click position {i + 1}: {pos.x}, {pos.y}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ImageHolder;